import { useEffect, useRef } from "react";

export default function Section(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.style.backgroundImage = `url("${props.bgImg}")`;
  }, []);

  return (
    <div className="section-container" data-number={props.number} ref={containerRef}>
      <div className="section-title">{props.title}</div>
    </div>
  );
}