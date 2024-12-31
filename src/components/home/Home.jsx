import Section from "./Section.jsx";
import { useEffect } from "react";
import RetroStatic from "../../assets/retro_static.gif";
import { icons } from "../../utils/icons.js";
import { bgImg } from "../../utils/bgImg.js";

function Home(props) {
  useEffect(() => {
    props.loadingComplete();
  }, []);

  return (
    <>
      {/* <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/> */}

      <main id="home-container">
        <button className="drop-down-btn shadow-wide">
          <img src={icons.dropdown} className="icon" />
        </button>

        <div className="home-section-wrapper">
          {/* Temp link */}
          <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} link={"/"} />
          <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} link={"/"} />
          <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} link={"/"} />
          <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} link={"/"} />
          <Section number={"1."} title={"test"} bgImg={bgImg.sakuraIMG} link={"/"} />
        </div>
      </main>

      <div className="get-headphones-reminder">
        <img src={icons.headphone} id="headphone-icon" className="icon" alt="" />
        <div>Maybe grab a headphone and use a laptop?</div>
      </div>
      <div id="border-text-left" className="border-text">An excuse for me to make botanica</div>
      <div id="border-text-right" className="border-text">Made by Ethan</div>
    </>
  );
}

export default Home;