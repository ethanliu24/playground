import { createContext, useRef } from "react";

export const TransitionAudioContext = createContext(undefined);

export default function TransitionAudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const loadAudio = (pathToAudio) => {
    if (audioRef.current.src !== src) {
      audioRef.current.src = pathToAudio;
    }
  }

  const playAudio = (pathToAudio = null) => {
    if (!pathToAudio) loadAudio(pathToAudio);
    audioRef.current.play().catch(err => { console.error("Audio playback failed: ", err) });
  }

  const pauseAudio = () => {
    audioRef.current.pause();
  }

  const resumeAudio = () => {
    playAudio();
  }

  const resetAudio = () => {
    audioRef.current.currentTime = 0;
  }

  const muteAudio = () => {
    audioRef.current.muted = true;
  }

  const unmuteAudio = () => {
    audioRef.current.muted = false;
  }

  return (
    <TransitionAudioContext.Provider value={{
      loadAudio,
      playAudio,
      pauseAudio,
      resumeAudio,
      resetAudio,
      muteAudio,
      unmuteAudio,
    }}>
      { children }
    </TransitionAudioContext.Provider>
  );
}

