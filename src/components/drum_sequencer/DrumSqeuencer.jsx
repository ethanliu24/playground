import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";
import * as Constants from "./msgConstants.js";
import { samples } from "../../utils/drumSequencerFiles.js";

export default function DrumSequencer(props) {
  const [tracks, setTracks] = useState(samples.length);
  const [bpm, setBpm] = useState(97);
  const [nextNoteTime, setNextNoteTime] = useState(0); // time to play the next note
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event
  const [_, forceUpdate] = useReducer(x => x + 1, 0); // need this because states is asynchronous and isn't percise

  const gridRef = useRef([]); // format: grid[trackIdx][subdivisionIdx] is a note cell
  const tracksRef = useRef([]); // each element corresponds to a track
  const timerRef = useRef(null);
  const subdivisionsRef = useRef(64); // Each beat is divided into 4 subdivisions, i.e. 16th notes
  const subdivisionTimeRef = useRef(0); // how long each subdivision is
  const curSubdivisionRef = useRef(0);

  useEffect(() => {
    Tone.loaded().then(() => {
      subdivisionTimeRef.current = calcSubdivisionTime(bpm);
      window.addEventListener("click", startAudioContext, { once: true });
      initTimer();
      props.loadingComplete();
    });
  }, []);

  useEffect(() => {
    if (!timerRef.current) return;
    const newInterval = calcSubdivisionTime(bpm);
    timerRef.current.postMessage({ interval: newInterval });
    subdivisionTimeRef.current = newInterval;
  }, [bpm]);

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
      scheduleNote(subdivision, 0);
      curSubdivisionRef.current = (subdivision + 1) % subdivisionsRef.current;
      noteTime += subdivisionTimeRef.current;
    }

    setNextNoteTime(noteTime);
  };

  const scheduleNote = (subdivision, time) => {
    gridRef.current.forEach((track, trackRefIdx) => {
      const noteBox = track[subdivision];

      if (noteBox && noteBox.active()) {
        tracksRef.current[trackRefIdx].play(time);
      }
    });
  };

  const calcSubdivisionTime = (curBPM) => {
    return (60000.0 / curBPM) / 4;
  };

  const handlePlay = () => {
    if (!started) {
      startAudioContext();
    }

    if (playing) {
      timerRef.current.postMessage(Constants.STOP);
      setPlaying(false);
      curSubdivisionRef.current = 0;
    } else {
      timerRef.current.postMessage(Constants.START);
      setPlaying(true);
      setNextNoteTime(Tone.getContext().currentTime);
    }
  };

  const handleNoteClick = useCallback((clickedTrack, clickedsubdivision) => {
  }, []);

  const updateBPM = (newBPM) => {
    setBpm(newBPM);
  };

  const updateNumBars = (numBars) => {
    subdivisionsRef.current = numBars * 16;
  }

  const clearGrid = () => {
    gridRef.current.forEach((track) => {
      track.forEach((note) => {
        note.reset();
      });
    });
  };

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <DrumSequencerSettings
          playing={playing}
          bpm={bpm}
          updateBPM={updateBPM}
          handlePlay={handlePlay}
          clearGrid={clearGrid}
          bars={Math.floor(subdivisionsRef.current / 16)}
          updateNumBars={updateNumBars}
          forceUpdate={forceUpdate}
        />

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
  );
}
