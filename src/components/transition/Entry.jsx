export default function Entry(props) {
  return (
    <div id="entry-container">
      <button onClick={() => props.userDidInteract()}>click</button>
    </div>
  );
}