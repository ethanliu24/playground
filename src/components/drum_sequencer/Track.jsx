import Notebox from "./NoteBox.jsx";

export default function Track(props) {
  return (
    <div className="note-box-container">
      {Array(props.beats).fill().map((_, beat) => {
        const patchOne = beat % 8 >= 4;
        return <Notebox key={beat} track={props.track} beat={beat} handleNoteClick={props.handleNoteClick} patchOne={patchOne} />;
      })}
    </div>
  );
}