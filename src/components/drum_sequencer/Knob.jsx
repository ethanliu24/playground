import { useEffect, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { ROTATION_STYLE_REGEX } from "./constants";

gsap.registerPlugin(Draggable)

export default function Knob(props) {
  const [angle, setAngle] = useState(props.initialAngle); // in degrees

  const knobRef = useRef(null);

  useEffect(() => {
    const knob = knobRef.current;
    knob.style.transform = `rotate(${angle}deg)`

    Draggable.create(knob, {
      type: "rotation",
      onDrag: () => {
        const matchRotation = knob.style.transform.match(ROTATION_STYLE_REGEX);
        const rawAngle = matchRotation ? Math.floor(parseFloat(matchRotation[1])) : props.initialAngle;
        const clampedAngle = Math.max(props.minAngle, Math.min(props.maxAngle, rawAngle));
        knob.style.transform = `rotate(${clampedAngle}deg)`;
        const anglePercentage = (clampedAngle - props.minAngle) / (props.maxAngle - props.minAngle);
        props.updateKnobFunction(anglePercentage);
        setAngle(clampedAngle);
      }
    });
  }, []);

  return (
    <div id={props.id ? props.id : ""} className={`knob ${props.className ? props.className : ""}`} ref={knobRef}></div>
  );
}