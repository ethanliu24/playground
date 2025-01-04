import { useEffect, useRef } from "react";

export default function Knob() {
  const knobRef = useRef(null);

  useEffect(() => {
    const knob = knobRef.current;

    knob.addEventListener("mousemove", rotate);

    return () => {
      knob.removeEventListener("mousemove", rotate);
    }
  }, []);

  const rotate = (e) => {
    if (e.buttons === 1) {
      const rotateDeg = Math.floor(calculateDegree(e) - 90);
      knobRef.current.style.transform = `rotate(${rotateDeg}deg)`;
    }
  }

  const calculateDegree = (e) => {
    const x1 = window.innerWidth / 2;
    const y1 = window.innerHeight / 2;
    const x2 = e.clientX;
    const y2 = e.clientY;

    const deltaX = x1 - x2;
    const deltaY = y1 - y2;

    const rad = Math.atan2(deltaY, deltaX);
    const deg = rad * (180 / Math.PI);
    return deg
  };

  return (
    <div className="knob" ref={knobRef}>a</div>
  );
}