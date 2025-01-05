import { useState, useImperativeHandle, forwardRef } from "react";

export default forwardRef(function Notebox(props, ref) {
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      active: () => isActive,
      play: (time) => {
        soundRef.current.stop();
        soundRef.current.seek(0);
        soundRef.current.start(time);
      },
    };
  });

  const handleClick = () => {
    handleNoteActiveness();
  }

  const handleDrag = (e) => {
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
      onMouseEnter={handleDrag}
    >
    </button>
  );
})
