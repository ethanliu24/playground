import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";

export default function DrumSequencer(props) {
  const [beats, setBeats] = useState(64);
  const [curBeat, setCurBeat] = useState(0);
  const [tracks, setTracks] = useState(2);
  const [bpm, setBpm] = useState(97);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event

  const gridRef = useRef([]); // format: grid[trackIdx][beatIdx] is a note cell

  useEffect(() => {
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
    transport.scheduleRepeat(sequenceLoop, "8n");
  };

  const sequenceLoop = () => {
    setCurBeat(c => {
      gridRef.current.forEach((track) => {
        const noteBox = track[c];

        if (noteBox.active()) {
          noteBox.play();
        }
      });

      return (c + 1) % beats
    });
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
          {Array(tracks).fill().map((_, trackNum) => {
            return (
              <Track
                key={trackNum}
                track={trackNum}
                beats={beats}
                handleNoteClick={handleNoteClick}
                soundFile={"src/assets/drum_sequencer_sounds/test.mp3"}
                setGridCellRef={setGridCellRef}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}