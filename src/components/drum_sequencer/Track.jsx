import { useEffect, useState, useRef } from "react";
import * as Tone from "tone";
import Notebox from "./NoteBox.jsx";
import Knob from "./Knob.jsx";

export default function Track(props) {
  const [muted, setMuted] = useState(false);

  const channelRef = useRef(null);

  useEffect(() => {
    channelRef.current = new Tone.Channel({ volume: 9, pan: 0, mute: false }).toDestination();

    return () => {
      channelRef.current.dispose();
    };
  }, []);

  const muteTrack = () => {
    const muted = channelRef.current.mute;
    setMuted(!muted);
    channelRef.current.mute = !muted;
  };

  return (
    <div className="track">
      <div className="track-controls">
        <button className="track-mute-btn" onClick={muteTrack}><div className={`${muted ? "muted" : "unmuted"}`}></div></button>
        <Knob initialAngle={270} />
        <Knob initialAngle={180} />
        <div className="sound-file-name">{props.soundFile.split(".")[0]}</div>
      </div>

      <div className="note-box-container">
        {Array(props.beats).fill().map((_, beat) => {
          const patchOne = beat % 8 >= 4;
          return (
            <Notebox
              key={beat}
              track={props.track}
              beat={beat}
              handleNoteClick={props.handleNoteClick}
              patchOne={patchOne}
              soundFile={props.soundFile}
              channel={channelRef.current}
              ref={(cell) => props.setGridCellRef(props.track, beat, cell)}
            />
          );
        })}
      </div>
    </div>
  );
}