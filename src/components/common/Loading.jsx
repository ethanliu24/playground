import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Loading() {
  const [waitMessage, setWaitMessage] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    const loadingTextNodeList = document.querySelectorAll(".loading-text-elem");
    const loader = [document.getElementById("loader")];
    const loadingText = Array.from(loadingTextNodeList);

    gsap.timeline({ repeat: -1 }).to(loader.at(0), { duration: 1, rotate: 360, ease: "none" }) // loader spin animation
    tl.to(loadingText.concat(loader), {
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
  }, []);

  const startTime = Date.now();

  return (
    <>
      <div id="load-percentage-container">
        <div id="load-percentage">00%</div>
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