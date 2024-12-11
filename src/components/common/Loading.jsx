import { useState } from "react";

export default function Loading() {
  const [waitMessage, setWaitMessage] = useState("");

  const startTime = Date.now();


  return (
    <>
      <div id="load-percentage-container">
        <div id="load-percentage">00%</div>
      </div>
      <div id="loading-text-container">
        <div id="loading-text">
          {("LOADING").split("").map((letter) => {
            return <span className="loading-text-letter" key={letter}>{letter}</span>
          })}
        </div>
        <div id="wait-text">wait</div>
      </div>
    </>
  );
}