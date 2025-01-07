import { useEffect, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { ROTATION_STYLE_REGEX } from "./constants";

gsap.registerPlugin(Draggable)

export default function Knob(props) {
  const knobRef = useRef(null);

  useEffect(() => {
    const knob = knobRef.current;
    updateAngle(props.initialAngle);

    Draggable.create(knob, {
      type: "rotation",
      onDrag: () => {
        const matchRotation = knob.style.transform.match(ROTATION_STYLE_REGEX);
        const rawAngle = matchRotation ? Math.floor(parseFloat(matchRotation[1])) : props.initialAngle;
        const clampedAngle = updateAngle(rawAngle);
        const anglePercentage = (clampedAngle - props.minAngle) / (props.maxAngle - props.minAngle);
        props.updateKnobFunction(anglePercentage);
      }
    });
  }, []);

  useEffect(() => {
    updateAngle(props.initialAngle);
  }, [props.initialAngle])

  const updateAngle = (rawAngle) => {
    const clampedAngle = Math.max(props.minAngle, Math.min(props.maxAngle, rawAngle));
    knobRef.current.style.transform = `rotate(${clampedAngle}deg)`;
    return clampedAngle;
  }

  return (
    <div id={props.id ? props.id : ""} className={`knob ${props.className ? props.className : ""}`} ref={knobRef}></div>
  );
}