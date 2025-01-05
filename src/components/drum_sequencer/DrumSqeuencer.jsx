import { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import Track from "./Track.jsx";
import DrumSequencerSettings from "./DrumSequencerSettings.jsx";

export default function DrumSequencer(props) {
  const [beats, setBeats] = useState(64);
  const [tracks, setTracks] = useState(1);
  const [bpm, setBpm] = useState(97);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // keep track of first user event
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    let initialGrid = [];

    for (let i = 0; i < tracks; i++) {
      initialGrid.push(Array(beats).fill(false));
    };

    setGrid(grid);

    window.addEventListener("click", startAudioContext, { once: true });
    props.loadingComplete();
  }, []);

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
  }

  const startAudioContext = () => {
    Tone.start();
    // Tone.getDestination().volume.rampTo(-10, 0.001);
    const transport = Tone.getTransport();
    transport.bpm.value = bpm;
    // TODO set up scheduler transport.scheduleRepeat(() => {}, "8n");
    setStarted(true);
  }

  const handleNoteClick = useCallback((clickedTrack, clickedBeat) => {
  }, []);

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <DrumSequencerSettings handlePlay={handlePlay} />
        <div className="track-container">
          {Array(tracks).fill().map((_, trackNum) => {
            return <Track key={trackNum} track={trackNum} beats={beats} handleNoteClick={handleNoteClick} soundFile={"src/assets/drum_sequencer_sounds/test.mp3"} />
          })}
        </div>
      </div>
    </div>
  );
}