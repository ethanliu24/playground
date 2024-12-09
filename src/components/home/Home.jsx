import RetroStatic from "../../assets/retro_static.gif";
import headphoneIcon from "../../assets/icons/headphone.svg";

function Home() {
  return (
    <>
      <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/>

      <main id="home-container">
      </main>

      <div className="get-headphones-reminder">
        <img src={headphoneIcon} id="headphone-icon" className="icon" alt="" />
        <div>Maybe grab a headphone and use a laptop?</div>
      </div>
      <div id="border-text-left" className="border-text">An excuse for me to make botanica</div>
      <div id="border-text-right" className="border-text">Made by Ethan</div>
    </>
  );
}

export default Home;