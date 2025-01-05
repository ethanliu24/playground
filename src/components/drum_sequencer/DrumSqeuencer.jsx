import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";
import { samples } from "../../utils/drumSequencerFiles.js";

export default function DrumSequencer(props) {
  const [beats, setBeats] = useState(16);
  const [tracks, setTracks] = useState(samples.length);
  const [bpm, setBpm] = useState(97);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event

  const gridRef = useRef([]); // format: grid[trackIdx][beatIdx] is a note cell

  useEffect(() => {
    console.log(samples.spinz808)
    window.addEventListener("click", startAudioContext, { once: true });
    props.loadingComplete();
  }, []);

  /**
   * Each note cell will be referenced in gridRef when the sequencer is first mounted
   */
  const setGridCellRef = (trackIdx, beatIdx, ref) => {
    if (!gridRef.current[trackIdx]) {
      gridRef.current[trackIdx] = [];
    }
    gridRef.current[trackIdx][beatIdx] = ref;
  };

  const startAudioContext = () => {
    Tone.start();
    initSchedule();
    setStarted(true);
  };

  const initSchedule = () => {
    const transport = Tone.getTransport();
    transport.bpm.value = bpm;
    transport.scheduleRepeat(sequenceLoop, "16n");
  };

  var beat = 0 // Can't use useState because it's asynchronous, it messes up the timing
  const sequenceLoop = () => {
    gridRef.current.forEach((track) => {
      const noteBox = track[beat];

      if (noteBox.active()) {
        noteBox.play();
      }
    });

    beat = (beat + 1) % beats
  };

  const handlePlay = () => {
    if (!started) {
      startAudioContext();
    } else {
      const transport = Tone.getTransport();

      if (playing) {
        transport.stop();
        setPlaying(false);
      } else {
        transport.start();
        setPlaying(true);
      }
    }
  };

  const handleNoteClick = useCallback((clickedTrack, clickedBeat) => {
  }, []);

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <DrumSequencerSettings handlePlay={handlePlay} />
        <div className="track-container">
          {samples.map((soundFile, trackNum) => {
            return (
              <Track
                key={trackNum}
                track={trackNum}
                beats={beats}
                handleNoteClick={handleNoteClick}
                soundFile={soundFile}
                setGridCellRef={setGridCellRef}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}