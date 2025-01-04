import { useCallback, useEffect, useState } from "react";
import Track from "./Track.jsx";

export default function DrumSequencer(props) {
  const [beats, setBeats] = useState(128);
  const [tracks, setTracks] = useState(5);
  const [bpm, setBpm] = useState(97);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    let initialGrid = [];

    for (let i = 0; i < tracks; i++) {
      initialGrid.push(Array(beats).fill(false));
    };

    setGrid(grid);
    props.loadingComplete();
  }, []);

  const handleNoteClick = useCallback((clickedTrack, clickedBeat) => {
    console.log("hi");
  }, []);

  return (
    <div className="drum-sequencer-container">
      <div className="drum-sequencer">
        <div className="track-container">
          {Array(tracks).fill().map((_, trackNum) => {
            return <Track key={trackNum} track={trackNum} beats={beats} handleNoteClick={handleNoteClick} />
          })}
        </div>
      </div>
    </div>
  );
}