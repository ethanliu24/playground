export default function Loading() {
  return (
    <>
      <div>HI</div>
      <div id="load-percentage-container">
        <div id="load-percentage"></div>
      </div>
      <div id="loading-text">
        {("LOADING").split("").map((letter) => {
          <span key={letter}>{letter}</span>
        })}
      </div>
    </>
  );
}