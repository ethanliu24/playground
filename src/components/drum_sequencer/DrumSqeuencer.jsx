import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";
import * as Constants from "./msgConstants.js";
import { samples } from "../../utils/drumSequencerFiles.js";

export default function DrumSequencer(props) {
  const [subdivisions, setSubdivisions] = useState(64); // Each beat is divided into 4 subdivisions, i.e. 16th notes
  const [tracks, setTracks] = useState(samples.length);
  const [bpm, setBpm] = useState(97);
  const [subdivisionTime, setSubdivisionTime] = useState((60000.0 / bpm) / 4); // how long each subdivision is
  const [nextNoteTime, setNextNoteTime] = useState(0); // time to play the next note
  const [curSubdivision, setCurSubdivision] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event

  const gridRef = useRef([]); // format: grid[trackIdx][subdivisionIdx] is a note cell
  const tracksRef = useRef([]); // each element corresponds to a track
  const timerRef = useRef(null);

  useEffect(() => {
    Tone.loaded().then(() => {
      window.addEventListener("click", startAudioContext, { once: true });
      initTimer();
      props.loadingComplete();
    });
  }, []);

  /**
   * Each track will be referenced in gridRef when the sequencer is first mounted
   */
  const setTracksRef = (trackIdx, ref) => {
    tracksRef.current[trackIdx] = ref;
  }

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
    timer.postMessage({ interval: subdivisionTime }); // set timer interval
    timer.addEventListener("message", (e) => {
      if (e.data === Constants.TICK) {
        schedule();
      }
    });
  };

  const startAudioContext = () => {
    Tone.start();
    setStarted(true);
  };

  const schedule = () => {
    var noteTime = nextNoteTime; // for more percision timing

    while (noteTime < Tone.getContext().currentTime + Constants.SCHEDULE_TIME_AHEAD) {
      setCurSubdivision(c => {
        scheduleNote(c);

        return (c + 1) % subdivisions;
      });

      noteTime += subdivisionTime;
    }

    setNextNoteTime(noteTime);
  }

  const scheduleNote = (subdivision, time) => {
    gridRef.current.forEach((track, trackRefIdx) => {
      const noteBox = track[subdivision];

      if (noteBox.active()) {
        tracksRef.current[trackRefIdx].play(time);
      }
    });
  };

  const handlePlay = () => {
    console.log(playing)
    if (!started) {
      startAudioContext();
    }

    if (playing) {
      timerRef.current.postMessage(Constants.STOP);
      setPlaying(false);
    } else {
      setNextNoteTime(Tone.getContext().currentTime);
      timerRef.current.postMessage(Constants.START);
      setPlaying(true);
    }
  };

  const handleNoteClick = useCallback((clickedTrack, clickedsubdivision) => {
  }, []);

  const updateBPM = (newBPM) => {
    setBpm(newBPM);
  }

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <DrumSequencerSettings
          playing={playing}
          bpm={bpm}
          updateBPM={updateBPM}
          handlePlay={handlePlay}
        />

        <div className="track-container">
          {samples.map((soundFile, trackNum) => {
            return (
              <Track
                key={trackNum}
                track={trackNum}
                subdivisions={subdivisions}
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
