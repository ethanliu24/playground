import { useImperativeHandle, forwardRef, useRef } from "react";
import Knob from "./Knob.jsx";
import { BEAT_INDICATOR_ON_OPACITY, BEAT_INDICATOR_OFF_OPACITY } from "./constants.js";

/**
 * I don't know any other ways to line up the indicators with note boxes percicely.
 * Maybe a different layout design would not have to copy the Track componenet exactly here.
 */
export default forwardRef(function BeatIndicator(props, ref) {
  const indicatorsRef = useRef([]);

  useImperativeHandle(ref, () => {
    return {
      updateIndicator: (subdivision, time) => {
        const firstBeat = subdivision === 0;
        setTimeout(() => {
          indicatorsRef.current[subdivision].style.opacity = BEAT_INDICATOR_ON_OPACITY;
          indicatorsRef.current[firstBeat ? props.subdivisions - 1 : subdivision - 1]
            .style
            .opacity = BEAT_INDICATOR_OFF_OPACITY;
        }, time)
      },
      clearIndicators: () => {
        indicatorsRef.current.forEach(indicator => {
          if (!indicator) return;
          indicator.style.opacity = BEAT_INDICATOR_OFF_OPACITY;
        });
      },
    };
  });

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
          return (
            <button key={subdivision} className="beat-indicator-box">
              <div
                className="beat-indicator"
                ref={(indicator) => indicatorsRef.current[subdivision] = indicator}
              >
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
})