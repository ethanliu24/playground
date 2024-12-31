import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { icons } from "../../utils/icons.js";
import { bgImg } from "../../utils/bgImg.js";
import Section from "./Section.jsx";
import RetroStatic from "../../assets/retro_static.gif";

function Home(props) {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const dropdownBtnRef = useRef(null);

  useEffect(() => {
    props.loadingComplete();
  }, []);

  const handleDropdownClick = () => {
    gsap.to(dropdownBtnRef.current, {
      rotate: dropdownOpen ? 0 : 180,
      duration: 0.1,
      ease: "power4.inOut",
    });

    setDropdownOpen(d => !d);
  }

  return (
    <>
      {/* <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/> */}

      <main id="home-container">
        <button className="drop-down-btn shadow-wide" ref={dropdownBtnRef} onClick={handleDropdownClick}>
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