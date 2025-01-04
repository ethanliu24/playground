import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Section(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const animaitonDur = 0.35;

    containerRef.current.style.backgroundImage = `url("${props.bgImg}")`;

    containerRef.current.addEventListener("mouseenter", () => {
      gsap.to(containerRef.current, {
        '-webkit-filter': 'grayscale(100%)',
        filter: "grayscale(100%)",
        scale: 0.98,
        duration: animaitonDur,
      });
    });

    containerRef.current.addEventListener("mouseleave", () => {
      gsap.to(containerRef.current, {
        '-webkit-filter': 'grayscale(0%)',
        filter: "grayscale(0%)",
        scale: 1,
        duration: animaitonDur,
      });
    });

    return () => {
      if (!containerRef.current) return;

      containerRef.current.removeEventListener("mouseenter", () => {});
      containerRef.current.removeEventListener("mouseleave", () => {});
    };
  }, [props.bgImg]);

  return (
    <Link to={props.link} target={props.newWindow ? "_blank" : ""} rel="noopener noreferrer">
      <div className="section-container shadow-narrow" data-idx={props.idx} ref={containerRef}>
        <div className="section-title">{props.title}</div>
      </div>
    </Link>
  );
}