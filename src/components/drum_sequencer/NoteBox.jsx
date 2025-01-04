export default function Notebox(props) {
  const handleClick = () => {
    props.handleNoteClick();
  };

  return (
    <button className="note-box" onClick={handleClick}>aa</button>
  );
}
