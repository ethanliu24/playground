import { useRef } from "react";
import Knob from "./Knob.jsx";
import { icons } from "../../utils/icons.js"
import { MIN_BPM, MAX_BPM } from "./constants.js";

export default function DrumSequencerSettings(props) {
  const bpmSliderRef = new useRef(null);

  const updateSwing = (swingAmt) => {
    props.updateSwing(swingAmt);
  }

  const updateBPM = () => {
    const newBPM = bpmSliderRef.current.value;
    props.updateBPM(newBPM);
  }

  const handleBarChange = (e) => {
    const numBars = parseInt(e.target.value);
    props.updateNumBars(numBars);
    props.forceUpdate();
  }

  const handlePresetChange = (e) => {
    const presetName = e.target.value;
    props.updatePreset(presetName);
  }

  return (
    <div className="sequencer-settings-container">
      <img src={props.playing ? icons.pause : icons.play} id="sequencer-play-btn" className="icon" onClick={props.handlePlay} />
      <Knob initialAngle={30} maxAngle={330} minAngle={30} updateKnobFunction={updateSwing} id="swing-knob" />
      <select name="bars" id="bars-selector" className="dropdown-selector channel-rack-ui" value={props.bars} onChange={handleBarChange}>
        <option value="1">1 bar</option>
        <option value="2">2 bars</option>
        <option value="4">4 bars</option>
        <option value="8">8 bars</option>
        <option value="16">16 bars</option>
      </select>
      <select name="presets" id="preset-selector" className="dropdown-selector channel-rack-ui" value={props.preset} onChange={handlePresetChange}>
        <option value="hip_hop">Hip Hop</option>
        <option value="new_jack_swing">New Jack Swing</option>
      </select>
      <button id="clear-btn" className="channel-rack-ui" onClick={props.clearGrid}>clear</button>
      <input type="range" min={MIN_BPM} max={MAX_BPM} value={props.bpm} className="slider" onChange={updateBPM} ref={bpmSliderRef} />
      <div id="bpm-value" className="channel-rack-ui slider-value">{`bpm: ${props.bpm}`}</div>
    </div>
  );
}