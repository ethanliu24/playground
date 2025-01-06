import { useRef } from "react";
import Knob from "./Knob.jsx";
import { icons } from "../../utils/icons.js"

export default function DrumSequencerSettings(props) {
  const bpmSliderRef = new useRef(null);

  const updateBPM = () => {
    const newBPM = bpmSliderRef.current.value;
    props.updateBPM(newBPM);
  }

  return (
    <div className="sequencer-settings-container">
      <img src={props.playing ? icons.pause : icons.play} id="sequencer-play-btn" className="icon" onClick={props.handlePlay} />
      <Knob initialAngle={30} maxAngle={330} minAngle={30} id="swing-knob" />
      <select name="bars" id="bars-selector" className="dropdown-selector channel-rack-ui" onChange={() => {}}>
        <option value="1">1 bar</option>
        <option value="2">2 bars</option>
        <option value="4">4 bars</option>
        <option value="8">8 bars</option>
        <option value="16">16 bars</option>
      </select>
      <button id="clear-btn" className="channel-rack-ui" onClick={props.clearGrid}>clear</button>
      <input type="range" min="40" max="200" value={props.bpm} className="slider" onChange={updateBPM} ref={bpmSliderRef} />
      <div id="bpm-value" className="channel-rack-ui slider-value">{`bpm: ${props.bpm}`}</div>
    </div>
  );
}