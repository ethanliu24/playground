import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable)
const ROTATIO_STYLE_REGEX = /rotate\((-?\d+(\.\d+)?)deg\)/;

export default function Knob(props) {
  const [rotation, setRotation] = useState(props.initialAngle); // in degrees

  const knobRef = useRef(null);

  useEffect(() => {
    const knob = knobRef.current;
    knob.style.transform = `rotate(${rotation}deg)`

    Draggable.create(knob, {
      type: "rotation",
      onDrag: () => {
        const matchRotation = knob.style.transform.match(ROTATIO_STYLE_REGEX);
        const angle = matchRotation ? Math.floor(parseFloat(matchRotation[1])) : props.initialAngle;
        setRotation(angle);

        if (angle > props.maxAngle || angle < props.minAngle) {
          const clampedAngle = Math.max(props.minAngle, Math.min(props.maxAngle, angle));
          knob.style.transform = `rotate(${clampedAngle}deg)`;
          setRotation(clampedAngle);
        }
      }
    });
  }, []);

  return (
    <div className="knob" ref={knobRef}></div>
  );
}