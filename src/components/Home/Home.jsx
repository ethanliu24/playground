import RetroStatic from "../../assets/retro_static.gif"
import "./home.css"

export default function Home() {
  return (
    <>
      <img src={RetroStatic} alt="" draggable="false" className="retro-static unselectable"/>

      <div id="border-text-left" className="border-text">An excuse for me to make botanica</div>
      <div id="border-text-right" className="border-text">Made by Ethan</div>

    </>
  )
}