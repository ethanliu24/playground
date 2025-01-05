import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

export default function Notebox(props) {
  const [isActive, setIsActive] = useState(false);

  const noteBoxRef = useRef(null);
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

  const handleClick = () => {
    handleNoteActiveness();
    // TODO auto play
    Tone.loaded().then(() => {
      soundRef.current.start();
    });
  }

  const handleHover = (e) => {
    if (e.buttons === 1) handleNoteActiveness();
  }

  const handleNoteActiveness = () => {
    setIsActive(i => !i);
    props.handleNoteClick(props.track, props.beat);
  }

  return (
    <button
      className={`note-box ${props.patchOne ? "note-patch-1" : "note-patch-2"} ${isActive ? "note-is-active" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      ref={noteBoxRef}
    >
    </button>
  );
}
