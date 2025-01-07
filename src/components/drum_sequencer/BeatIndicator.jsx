import { useImperativeHandle } from "react";
import Knob from "./Knob.jsx";

/**
 * I don't know any other ways to line up the indicators with note boxes percicely.
 * Maybe a different layout design would not have to copy the Track componenet exactly here.
 */
export default function BeatIndicator({ ...props }) {
  // useImperativeHandle(ref, () => {
  //   return {

  //   };
  // });

  return (
    <div id="beat-indicator-container" className="track">
      <div className="track-controls" style={{ visibility: "hidden" }}>
        <button className="track-mute-btn"></button>
        <Knob initialAngle={0} maxAngle={0} minAngle={0} updateKnobFunction={() => {}} />
        <Knob initialAngle={0} maxAngle={0} minAngle={0} updateKnobFunction={() => {}} />
        <div className="sound-file-name">{0}</div>
      </div>

      <div className="note-box-container">
        {Array(props.subdivisions).fill().map((_, subdivision) => {
          return <button key={subdivision} className="beat-indicator-box"><div className="beat-indicator"></div></button>
        })}
      </div>
    </div>
  );
}