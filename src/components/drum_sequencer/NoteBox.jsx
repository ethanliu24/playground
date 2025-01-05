import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import * as Tone from "tone";

export default forwardRef(function Notebox(props, ref) {
  const [isActive, setIsActive] = useState(false);

  const soundRef = useRef(null);

  useEffect(() => {
    return () => {
      soundRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!props.channel) return;

    soundRef.current = new Tone.Player(props.soundFile).connect(props.channel);
  }, [props.channel]);

  useImperativeHandle(ref, () => {
    return {
      active: () => isActive,
      play: () => {
        soundRef.current.stop();
        soundRef.current.seek(0);
        soundRef.current.start();
      },
    };
  });

  const handleClick = () => {
    handleNoteActiveness();
  }

  const handleHover = (e) => {
    if (e.buttons === 1) handleNoteActiveness();
  }

  const handleNoteActiveness = () => {
    setIsActive(i => !i);
    props.handleNoteClick(props.track, props.subdivision);
  }

  return (
    <button
      className={`note-box ${props.patchOne ? "note-patch-1" : "note-patch-2"} ${isActive ? "note-is-active" : ""}`}
      onMouseDown={handleClick}
      onMouseEnter={handleHover}
    >
    </button>
  );
})
