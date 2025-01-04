import { useCallback, useEffect, useState } from "react";
import Notebox from "./NoteBox.jsx";

export default function DrumSequencer(props) {
  const [beats, setBeats] = useState(32);
  const [tracks, setTracks] = useState(1);
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
      <Notebox handleNoteClick={handleNoteClick} />
    </div>
  );
}