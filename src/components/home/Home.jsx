import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { icons } from "../../utils/icons.js";
import { bgImg } from "../../utils/bgImg.js";
import Section from "./Section.jsx";
import RetroStatic from "../../assets/retro_static.gif";
import * as Constants from "../../utils/constants.js";

function Home(props) {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const dropdownBtnRef = useRef(null);
  const dropdownAnimation = useRef(null);

  useEffect(() => {
    dropdownAnimation.current = gsap.timeline({ paused: true });
    dropdownAnimation.current.to(".section-container", {
      duration: 0.7,
      scale: 0.7,
      opacity: 0,
      ease: "expo.inOut",
      stagger: 0.05,
    });
    dropdownAnimation.current.reverse();

    props.loadingComplete();

    return () => {
      dropdownAnimation.current.kill();
    }
  }, []);

  const handleDropdownClick = () => {
    gsap.to(dropdownBtnRef.current, {
      rotate: dropdownOpen ? 0 : 180,
      duration: 0.3,
      ease: "power4.inOut",
    });

    dropdownAnimation.current.reversed(!dropdownAnimation.current.reversed());
    setDropdownOpen(d => !d);
  };

  const constructSectionData = (title, bgImg, link, newWindow) => {
    return {
      title: title,
      bgImg: bgImg,
      link: link,
      newWindow: newWindow,
    };
  };

  const sections = [
    constructSectionData("DRUM SEQUENCER", bgImg.skyIMG, Constants.DRUM_SEQUENCER_ROUTE, false),
    constructSectionData("PORTFOLIO", bgImg.forestIMG, Constants.PORTFOLIO_ROUTE, true),
  ];

  return (
    <>
      {/* <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/> */}

      <main id="home-container">
        <button className="drop-down-btn shadow-wide" ref={dropdownBtnRef} onClick={handleDropdownClick}>
          <img src={icons.dropdown} className="icon" />
        </button>

        <div className="home-section-wrapper">
          {sections.map((data, idx) => {
            return (
              <Section
                key={idx.toString()}
                idx={`${idx + 1}.`}
                title={data.title}
                bgImg={data.bgImg}
                link={data.link}
                newWindow={data.newWindow}
              />
            );
          })}
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