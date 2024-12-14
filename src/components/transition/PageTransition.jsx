import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef, useState } from "react";
import Loading from "./Loading.jsx";
import Entry from "./Entry.jsx";

gsap.registerPlugin(useGSAP);

// TODO add music param
export default function PageTransition(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const containerRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useGSAP(() => {
    if (isLoading) return;

    if (!userInteracted) return;

    if (props.clipVisualPath) titleRef.current.style.backgroundImage = `url("${props.clipVisualPath}")`;

    const { src, length, impactTime } = props.audioData;
    const audio = new Audio(src);
    audio.play();

    // Generally, length is the length of the audio, but it could be modified to how long we want the
    // animation to be if the audio tail is too long. It's specified in src/utils/transitionAudio.js
    const animationDur = Math.max(5, length);

    const mainRippleIncrementRate = 900;
    const mainRippleDur = 3.5;
    const mainRippleDelayTime = impactTime; // main ripple plays to the impact time of bg audio

    const subRippleIncrementRate = 500;
    const subRippleDur = 6;
    const subRippleDelayTime = mainRippleDelayTime + 0.5;
    const subRipples = document.querySelectorAll(".sub-ripple");

    const mainRippleTL = gsap.timeline();
    mainRippleTL.to("#ripple-main", rippleAnimationProps(mainRippleIncrementRate, 0.7, mainRippleDur), mainRippleDelayTime);

    const subRippleTL = gsap.timeline();
    subRipples.forEach((elem, i) => {
      subRippleTL.to(elem, rippleAnimationProps(subRippleIncrementRate, 0.9, subRippleDur), (i * 0.3) + subRippleDelayTime);
    })

    const titleTL = gsap.timeline();
    titleTL.to(titleRef.current, textAnimationProps("2rem", animationDur / 2), mainRippleDelayTime);
    const subtitleTL = gsap.timeline();
    subtitleTL.to(subtitleRef.current, textAnimationProps("0.4rem", animationDur / 2), mainRippleDelayTime);

    const master = gsap.timeline({
      onStart: () => {
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        containerRef.current.style.display = 'none';
        document.body.style.overflow = "visible";
        setAnimationCompleted(true);
      },
      repeat: 0,
      defaults: {
        duration: animationDur,
      }
    });

    master
      .to(containerRef.current, { duration: animationDur, opacity: 1 })
      .to(containerRef.current, { duration: 1, opacity: 0 })
  }, [isLoading, userInteracted]);

  const rippleAnimationProps = (rate, opacity, duration) => {
    return {
      keyframes: {
        easeEach: "none",
        "0%": { opacity: 0 },
        "10%": { opacity: opacity },
        "80%": { opacity: opacity },
        "100%": { opacity: 0 },
      },

      width: `+=${rate}`, height: `+=${rate}`,
      x: `-=${rate / 2}`, y: `-=${rate / 2}`,
      ease: "expo.out",
      duration: duration,
    };
  }

  // Animation properties for texts. For letterSpacing, include the unit as well.
  const textAnimationProps = (letterSpacing, duration) => {
    return {
      opacity: 1,
      letterSpacing: letterSpacing,
      duration: duration,
      marginLeft: letterSpacing,
      ease: "expo.out",
    }
  }

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
      width: "30px",
      height: "30px",
      left: `${x}%`,
      top: `${y}%`,
    };
  }

  const loadingComplete = useCallback(() => {
    setIsLoading(false);
  });

  const userDidInteract = useCallback(() => {
    setUserInteracted(true);
  })

  // The page to display after the animations
  const Page = props.page;

  /* It is neccessary that we load both the Loading and the other components together because
   * we set the isLoading state to false after the child component is mounted and loaded.
   * If we just return a Loading component, the isLoading state will never be updated.
   */
  return (
    <>
      { isLoading ? <Loading /> : null }

      { !isLoading ? (
          !userInteracted ? <Entry userDidInteract={userDidInteract} /> : null
        ) : null
      }

      <div className="dummy-container" style={{ display: !isLoading && userInteracted ? "block" : "none" }}>
        {/* TODO split the transition animation code and component in a diff file */}
        { !animationCompleted ? <div id="transition-container" ref={containerRef}>
            <div id="transition-cover-layer"></div>

            <div id="ripple-main-wrapper">
              <div id="ripple-main" className="ripple fixed-scalable"></div>
            </div>

            {[[true, true], [false, true], [true, false], [false, false]].map((item, i) => {
              const [isLeft, isTop] = item;
              const generateRipple = Math.random() > 0.4;

              return generateRipple ? (<div style={generateStyles(isLeft, isTop)} key={`sub-ripple-key${i}`}>
                <div id={`sub-ripple-${i}`} className="sub-ripple ripple fixed-scalable"></div>
              </div>) : null;
            })}

            <div id="transition-text-wrapper">
              <h1 id="transition-title" ref={titleRef}>{props.title}</h1>
              <h2 id="transition-subtitle" ref={subtitleRef}>{props.subtitle}</h2>
            </div>
          </div> : null
        }

        <Page loadingComplete={loadingComplete} animationCompleted={animationCompleted} />
      </div>
    </>
  );
}