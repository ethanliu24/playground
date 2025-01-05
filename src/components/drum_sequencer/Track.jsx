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

  const parseFileName = () => {
    const fileName = props.soundFile.split("/").pop();
    const sampleName = fileName.split(".")[0];
    return sampleName;
  }

  return (
    <div className="track">
      <div className="track-controls">
        <button className="track-mute-btn" onClick={muteTrack}><div className={`${muted ? "muted" : "unmuted"}`}></div></button>
        <Knob initialAngle={270} />
        <Knob initialAngle={180} />
        <div className="sound-file-name">{parseFileName()}</div>
      </div>

      <div className="note-box-container">
        {Array(props.subdivisions).fill().map((_, subdivision) => {
          const patchOne = subdivision % 8 >= 4;
          return (
            <Notebox
              key={subdivision}
              track={props.track}
              subdivision={subdivision}
              handleNoteClick={props.handleNoteClick}
              patchOne={patchOne}
              soundFile={props.soundFile}
              channel={channelRef.current}
              ref={(cell) => props.setGridCellRef(props.track, subdivision, cell)}
            />
          );
        })}
      </div>
    </div>
  );
}