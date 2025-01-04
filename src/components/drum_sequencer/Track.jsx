import Notebox from "./NoteBox.jsx";
import Knob from "./Knob.jsx";
import { useState } from "react";

export default function Track(props) {
  const [muted, setMuted] = useState(false);

  const muteTrack = () => {
    setMuted(m => !m);
  };

  return (
    <div className="track">
      <div className="track-controls">
        <button className="track-mute-btn" onClick={muteTrack}><div className={`${muted ? "muted" : "unmuted"}`}></div></button>
        <Knob />
        <Knob />
        <div className="sound-file-name">{props.fileName}</div>
      </div>

      <div className="note-box-container">
        {Array(props.beats).fill().map((_, beat) => {
          const patchOne = beat % 8 >= 4;
          return <Notebox key={beat} track={props.track} beat={beat} handleNoteClick={props.handleNoteClick} patchOne={patchOne} />;
        })}
      </div>
    </div>
  );
}