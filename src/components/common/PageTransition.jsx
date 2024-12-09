import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP)

// TODO add music param
export default function PageTransition(props) {
  const containerRef = useRef();
  // const cover = useRef();

  useGSAP(() => {
    // TODO set duration to max(5, music.length)
    const animationDur = 5;

    const containerTL = gsap.timeline({
      onComplete: () => containerRef.current.style.display = 'none',
      repeat: 0,
      defaults: {
        duration: animationDur,
      }
    });

    containerTL
      .to(containerRef.current, { duration: animationDur, opacity: 1 })
      .to(containerRef.current, { duration: 1, opacity: 0 })
  }, { scope: containerRef });

  return (
    <>
      <div id="transition-container" ref={containerRef}>
        <div id="transition-cover-layer"></div>
      </div>

      {props.page}
    </>
  );
}