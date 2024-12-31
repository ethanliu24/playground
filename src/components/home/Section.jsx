import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Section(props) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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

    containerRef.current.addEventListener("click", () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0,
        duration: animaitonDur,
        ease: "power4.inOut",
        onComplete: () => {
          navigate(props.link);
        }
      });
    });

    return () => {
      containerRef.current.removeEventListener("mouseenter", () => {});
      containerRef.current.removeEventListener("mouseleave", () => {});
      containerRef.current.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="section-container shadow-narrow" data-number={props.number} ref={containerRef}>
      <div className="section-title">{props.title}</div>
    </div>
  );
}