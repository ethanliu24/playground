import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Loading() {
  const [waitMessage, setWaitMessage] = useState("");

  const percentageRef = useRef();

  useGSAP(() => {
    const loadingTextNodeList = document.querySelectorAll(".loading-text-elem");
    const loader = [document.getElementById("loader")];
    const loadingText = Array.from(loadingTextNodeList);

    gsap.timeline({ repeat: -1 }).to(loader.at(0), { duration: 1, rotate: 360, ease: "none" }) // loader spin animation
    gsap.timeline({ repeat: -1 }).to(loadingText.concat(loader), {
      opacity: 1,
      stagger: 0.08,
      duration: 0.7,
      ease: "none",
    }).to(loadingText, {
      keyframes: {
        "50%": { y: -20 },
        "100%": { y: 0 },
      },
      stagger: 0.13,
      duration: 0.7,
      ease: "sine.inOut"
    }).to(loadingText.concat(loader), {
      y: -20,
      opacity: 0,
      stagger: 0.05,
      duration: 5,
      ease: "expo.out",
    }, 6);

    // lmfao this is useless
    const loadDuration = 2;
    const loadDelay = 1;

    gsap.timeline({ repeat: 0 }).to("#load-progress", {
      "--progress": "99%",
      duration: loadDuration,
      ease: "expo.inOut",
    }, loadDelay * 1)

    gsap.timeline({ repeat: 0 }).to(percentage, {
      progress: 99,
      duration: loadDuration,
      ease: "expo.inOut",
      onUpdate: () => {
        percentageRef.current.innerText = Math.min(99,
          Math.floor(percentage.progress)
        ).toString().padStart(2, "0") + "%";
      }
    }, loadDelay);
  }, []);

  let percentage = { progress: 0 };
  const startTime = Date.now();

  return (
    <>
      <div id="load-progress"></div>
      <div id="load-percentage-container">
        <div id="load-percentage" ref={percentageRef}>00%</div>
      </div>
      <div id="loading-text-container">
        <div id="loading-text">
          {("LOADING").split("").map((letter) => {
            return <div className="loading-text-elem" key={letter}>{letter}</div>
          })}
          <div id="loader"></div>
        </div>
        <div id="wait-text">wait</div>
      </div>
    </>
  );
}