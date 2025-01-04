export default function Notebox(props) {
  const handleClick = () => {
    props.handleNoteClick(props.track, props.beat);
  };

  return (
    <button className={`note-box ${props.patchOne ? "note-patch-1" : "note-patch-2"}`} onClick={handleClick}></button>
  );
}
