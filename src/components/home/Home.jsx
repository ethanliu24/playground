import Section from "./Section.jsx";
import { useEffect } from "react";
import RetroStatic from "../../assets/retro_static.gif";
import headphoneIcon from "../../assets/icons/headphone.svg";
import { bgImg } from "../../utils/bgImg.js";

function Home(props) {
  useEffect(() => {
    props.loadingComplete();
  }, []);

  return (
    <>
      {/* <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/> */}

      <main id="home-container">
        <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} />
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