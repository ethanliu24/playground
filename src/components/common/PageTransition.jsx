import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

// TODO add music param
export default function PageTransition(props) {
  const containerRef = useRef();
  // const cover = useRef();

  useGSAP(() => {
    // TODO set duration to max(5, music.length)
    const animationDur = 5;
    const rippleOpacityDecrementRate = 0.2;
    const mainRippleIncrementRate = 180;

    const rippleMainTL = gsap.timeline();
    rippleMainTL.to("#ripple-main", {
      keyframes: {
        easeEach: "none",
        "0%": {
          width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
          x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
          opacity: 0,
        },
        "10%": {
          opacity: 0.7,
        },
        "25%": {
          width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
          x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
        },
        "50%": {
          width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
          x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
        },
        "75%": {
          width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
          x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
        },
        "90%": {
          opacity: 0.7,
        },
        "100%": {
          width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
          x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
          opacity: 0,
        },
      },

      ease: "expo.out",
      duration: 3.5,
    })

    // rippleMainTL.from("#ripple-main", {
    //   opacity: 0,
    //   duration: 0.2,
    // }).to("#ripple-main", {
    //   opacity: 1,
    //   duration: 0.2,
    // }).to("#ripple-main", {
    //   width: `+=${mainRippleIncrementRate}`,
    //   height: `+=${mainRippleIncrementRate}`,
    //   x: `-=${mainRippleIncrementRate / 2}`,
    //   y: `-=${mainRippleIncrementRate / 2}`,
    //   opacity: `-=${rippleOpacityDecrementRate}`,
    //   duration: 2,
    //   ease: "power4.out",
    // }).to("#ripple-main", {
    //   opacity: 0,
    //   duration: 0.2,
    // })

    const master = gsap.timeline({
      onComplete: () => containerRef.current.style.display = 'none',
      repeat: 0,
      defaults: {
        duration: animationDur,
      }
    });

    master
      .to(containerRef.current, { duration: animationDur, opacity: 1 })
      .to(containerRef.current, { duration: 1, opacity: 0 })
  }, { scope: containerRef });

  return (
    <>
      <div id="transition-container" ref={containerRef}>
        <div id="transition-cover-layer"></div>
        <div id="ripple-main-wrapper">
          <div id="ripple-main" className="transition-ripple"></div>
        </div>
      </div>

      {props.page}
    </>
  );
}