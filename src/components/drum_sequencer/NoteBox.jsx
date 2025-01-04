import { useState, useRef } from "react";

export default function Notebox(props) {
  const [isActive, setIsActive] = useState(false);

  const noteBoxRef = useRef(null);

  const handleClick = () => {
    handleNoteActiveness();
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
      onMouseDown={handleClick}
      onMouseEnter={handleHover}
      ref={noteBoxRef}
    >
    </button>
  );
}
