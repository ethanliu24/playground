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
    const mainRippleIncrementRate = 900;

    const rippleMainTL = gsap.timeline();
    rippleMainTL.to("#ripple-main", {
      keyframes: {
        easeEach: "none",
        "0%": { opacity: 0 },
        "10%": { opacity: 0.7 },
        "90%": { opacity: 0.7 },
        "100%": { opacity: 0 },
      },

      width: `+=${mainRippleIncrementRate}`, height: `+=${mainRippleIncrementRate}`,
      x: `-=${mainRippleIncrementRate / 2}`, y: `-=${mainRippleIncrementRate / 2}`,
      ease: "expo.out",
      duration: 3.5,
    })

    const master = gsap.timeline({
      onStart: () => {
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        containerRef.current.style.display = 'none'
        document.body.style.overflow = "visible";
      },
      repeat: 0,
      defaults: {
        duration: animationDur,
      }
    });

    master.add(rippleMainTL, "+=0.3")

    master
      .to(containerRef.current, { duration: animationDur, opacity: 1 })
      .to(containerRef.current, { duration: 1, opacity: 0 })
  }, { scope: containerRef });

  // Generate a random position in the second quadrant.
  // The return value's unit is in % relative to the viewport
  const generatePos = () => {
    // The amount of space to avoid from the second quadrant
    const boundLeft = 0.4;
    const boundRight = 0.8;
    const boundTop = 0.2;
    const boundBottom = 0.9;

    // The right and bottom bounds of the second quadrant - their intersection is the origin
    const quadBoundX = window.innerWidth / 2;
    const quadBoundY = window.innerHeight / 2;

    // The points inside these bounds are where we generate a ripple
    const maxBoundX = quadBoundX * boundRight;
    const minBoundX = quadBoundX * boundLeft;
    const maxBoundY = quadBoundY * boundBottom;
    const minBoundY = quadBoundY * boundTop;

    const x = Math.floor((Math.random() * (maxBoundX - minBoundX) + minBoundX) / window.innerWidth * 100);
    const y = Math.floor((Math.random() * (maxBoundY - minBoundY) + minBoundY) / window.innerHeight * 100);
    return [x, y];
  }

  // Generates styles for a sub ripple
  const generateStyles = (isLeft, isTop) => {
    const [rawX, rawY] = generatePos();

    let x, y;
    if (isLeft && isTop) { // quadrant 2
      x = rawX;
      y = rawY;
    } else if (!isLeft && isTop) { // quadrant 1
      x = 100 - rawX;
      y = rawY;
    } else if (isLeft && !isTop) { // quadrant 4
      x = 100 - rawX;
      y = 100 - rawY;
    } else { // quadrant 3
      x = rawX;
      y = 100 - rawY;
    }

    return {
      position: "fixed",
      width: "50px",
      height: "50px",
      left: `${x}%`,
      top: `${y}%`,
    };
  }

  return (
    <>
      <div id="transition-container" ref={containerRef}>
        <div id="transition-cover-layer"></div>
        <div id="ripple-main-wrapper">
          <div id="ripple-main" className="ripple fixed-scalable"></div>
        </div>

        {[[true, true], [false, true], [true, false], [false, false]].map((item, i) => {
          const [isLeft, isTop] = item;
          const generateRipple = Math.random() > 0.4;

          return generateRipple ? (<div style={generateStyles(isLeft, isTop)} key={`sub-ripple-key${i}`}>
            <div id={`sub-ripple-${i}`} className="ripple fixed-scalable"></div>
          </div>) : null;
        })}
      </div>

      {props.page}
    </>
  );
}