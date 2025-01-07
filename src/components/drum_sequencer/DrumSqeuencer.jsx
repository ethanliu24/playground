import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";
import BeatIndicator from "./BeatIndicator.jsx";
import * as Constants from "./constants.js";
import { samples } from "../../utils/drumSequencerFiles.js";
import * as Presets from "./presets.js";

export default function DrumSequencer(props) {
  const [bpm, setBpm] = useState(Constants.INITIAL_BPM);
  const [swingPercentage, setSwingPercentage] = useState(Constants.INITIAL_SWING_AMOUNT);
  const [nextNoteTime, setNextNoteTime] = useState(0); // time to play the next note
  const [preset, setPreset] = useState("");
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event
  const [_, forceUpdate] = useReducer(x => x + 1, 0); // need this because states is asynchronous and isn't percise

  const gridRef = useRef([]); // format: grid[trackIdx][subdivisionIdx] is a note cell
  const tracksRef = useRef([]); // each element corresponds to a track
  const beatIndicatorRef = useRef(null);
  const timerRef = useRef(null);
  const subdivisionsRef = useRef(Constants.INITIAL_SUBDIVISIONS);
  const subdivisionTimeRef = useRef(0); // how long each subdivision is
  const curSubdivisionRef = useRef(0);
  const swingAmtRef = useRef(Constants.INITIAL_SWING_AMOUNT);
  const presetsRef = useRef([]);

  useEffect(() => {
    Tone.loaded().then(() => {
      window.addEventListener("click", startAudioContext, { once: true });

      subdivisionTimeRef.current = calcSubdivisionTime(bpm);
      initTimer();

      presetsRef.current = constructPresets();
      const initialPreset = presetsRef.current[0][Constants.PRESET_NAME];
      setPreset(initialPreset ? initialPreset : "");

      props.loadingComplete();
    });
  }, []);

  useEffect(() => {
    if (!timerRef.current) return;
    const newInterval = calcSubdivisionTime(bpm);
    timerRef.current.postMessage({ interval: newInterval });
    subdivisionTimeRef.current = newInterval;
  }, [bpm]);

  useEffect(() => {
    loadPreset(preset);
  }, [preset]);

  /**
   * Each track will be referenced in gridRef when the sequencer is first mounted
   */
  const setTracksRef = (trackIdx, ref) => {
    tracksRef.current[trackIdx] = ref;
  };

  /**
   * Each note cell will be referenced in gridRef when the sequencer is first mounted
   */
  const setGridCellRef = (trackIdx, subdivisionIdx, ref) => {
    if (!gridRef.current[trackIdx]) {
      gridRef.current[trackIdx] = [];
    }
    gridRef.current[trackIdx][subdivisionIdx] = ref;
  };

  // Set up timer in the main thread, it listens to when to schedule a subdivision
  const initTimer = () => {
    timerRef.current = new Worker(new URL("./timer.js", import.meta.url), { type: "module" })
    const timer = timerRef.current;
    timer.addEventListener("message", (e) => {
      if (e.data === Constants.TICK) {
        schedule();
      }
    });
    timer.postMessage({ interval: subdivisionTimeRef.current }); // set timer interval
  };

  const startAudioContext = () => {
    Tone.start();
    setStarted(true);
  };

  const schedule = () => {
    var noteTime = nextNoteTime;

    while (noteTime < Tone.getContext().currentTime + Constants.SCHEDULE_TIME_AHEAD) {
      const subdivision = curSubdivisionRef.current; // the current note box
      scheduleNote(subdivision);
      curSubdivisionRef.current = (subdivision + 1) % subdivisionsRef.current;
      noteTime += subdivisionTimeRef.current;
    }

    setNextNoteTime(noteTime);
  };

  const scheduleNote = (subdivision) => {
    const isSwingNote = subdivision % 2 === 1;
    const swingOffset = isSwingNote
      ? swingAmtRef.current / Constants.MS_PER_SECOND
      : 0;

    gridRef.current.forEach((track, trackRefIdx) => {
      const noteBox = track[subdivision];
      const delayAmt = Tone.now() + swingOffset;

      if (noteBox && noteBox.active()) {
        tracksRef.current[trackRefIdx].play(delayAmt);
      }

      beatIndicatorRef.current.updateIndicator(curSubdivisionRef.current, delayAmt);
    });
  };

  const calcSubdivisionTime = (curBPM) => {
    // If implementing divisions such as triplets, store divions per beat in a var
    return (Constants.MS_PER_MINUTE / curBPM) / Constants.DIVISIONS_PER_BEAT;
  };

  const constructPresets = () => {
    const presets = [];
    presets.push(Presets.createHipHop());
    presets.push(Presets.createClean());
    return presets;
  };

  const loadPreset = (presetName) => {
    // I got lazy lol can change up how presets are stored to get instant access instead of looping
    presetsRef.current.forEach((curPreset) => {
      if (curPreset[Constants.PRESET_NAME] === presetName) {
        pause();
        resetSequencerTracks();
        loadPresetDetails(curPreset); // curPreset here is the json obj data
      }
    });
  };

  const loadPresetDetails = (data) => {
    updateNumBars(data[Constants.PATTERN_BARS]);
    updateBPM(data[Constants.PATTERN_BPM]);
    updateSwing(data[Constants.PATTERN_SWING]);

    data[Constants.PATTERN_TRACKS].forEach((track) => {
      const trackIdx = track[Constants.TRACK_INDEX];
      const targetTrack = gridRef.current[trackIdx];
      const pattern = track[Constants.TRACK_PATTERN];
      pattern.forEach((placeNote, idx) => {
        if (placeNote) targetTrack[idx].activateNote();
      });

      const channel = tracksRef.current[trackIdx];
      channel.setMute(track[Constants.TRACK_MUTED]);
      channel.setVolume(track[Constants.TRACK_VOL]);
      channel.setPan(track[Constants.TRACK_PAN]);
    });
  };

  const handlePlay = () => {
    if (!started) {
      startAudioContext();
    }

    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const play = () => {
    timerRef.current.postMessage(Constants.START);
    setPlaying(true);
    setNextNoteTime(Tone.getContext().currentTime);
  };

  const pause = () => {
    timerRef.current.postMessage(Constants.STOP);
    setPlaying(false);
    curSubdivisionRef.current = 0;
    beatIndicatorRef.current.clearIndicators();
  };

  const handleNoteClick = useCallback((clickedTrack, clickedsubdivision) => {
    // Maybe it'll be useful one day
  }, []);

  const updateBPM = (newBPM) => {
    setBpm(newBPM);
  };

  const updateNumBars = (numBars) => {
    subdivisionsRef.current = numBars * Constants.DIVISIONS_PER_BAR;
    forceUpdate();
  };

  const updateSwing = (swingAmt) => {
    const maxSwingOffset = calcMaxSwingOffset();
    swingAmtRef.current = maxSwingOffset * swingAmt;
    setSwingPercentage(swingAmt);
  };

  const calcMaxSwingOffset = () => {
    return subdivisionTimeRef.current * Constants.MAX_SWING_AMT_PERCENTAGE;
  };

  const updatePreset = (presetName) => {
    setPreset(presetName);
  };

  const resetSequencerTracks = () => {
    tracksRef.current.forEach(track => { clearTrack(track); });
    clearGrid();
  };

  const clearTrack = (track) => {
    track.reset();
  };

  const clearGrid = () => {
    gridRef.current.forEach((track) => {
      track.forEach((note) => {
        if (note) note.reset();
      });
    });
  };

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <DrumSequencerSettings
          playing={playing}
          bpm={bpm}
          initialSwing={swingPercentage}
          updateBPM={updateBPM}
          handlePlay={handlePlay}
          clearGrid={clearGrid}
          bars={Math.floor(subdivisionsRef.current / Constants.DIVISIONS_PER_BAR)}
          preset={preset}
          updateNumBars={updateNumBars}
          updateSwing={updateSwing}
          updatePreset={updatePreset}
        />
        <div id="sequencer-content">
          <BeatIndicator subdivisions={subdivisionsRef.current} ref={beatIndicatorRef} />
          <div className="track-container">
            {samples.map((soundFile, trackNum) => {
              return (
                <Track
                  key={trackNum}
                  track={trackNum}
                  subdivisions={subdivisionsRef.current}
                  handleNoteClick={handleNoteClick}
                  soundFile={soundFile}
                  setGridCellRef={setGridCellRef}
                  ref={(track) => setTracksRef(trackNum, track)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
