import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable)
const ROTATIO_STYLE_REGEX = /rotate\((-?\d+(\.\d+)?)deg\)/;
const MAX_ANGLE = 330;
const MIN_ANGLE = 30;

export default function Knob(props) {
  const [roatation, setRotation] = useState(props.initialAngle); // in degrees

  const knobRef = useRef(null);

  useEffect(() => {
    const knob = knobRef.current;
    knob.style.transform = `rotate(${roatation}deg)`

    Draggable.create(knob, {
      type: "rotation",
      onDrag: () => {
        const matchRotation = knob.style.transform.match(ROTATIO_STYLE_REGEX);
        const angle = matchRotation ? Math.floor(parseFloat(matchRotation[1])) : props.initialAngle;

        if (angle > MAX_ANGLE || angle < MIN_ANGLE) {
          const clampedAngle = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, angle));
          knob.style.transform = `rotate(${clampedAngle}deg)`;
        }
      }
    });
  }, []);

  return (
    <div className="knob" ref={knobRef}></div>
  );
}