import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Entry(props) {
  const buttonRef = useRef(null);

  useGSAP(() => {

  }, [])

  return (
    <div id="entry-container">
      <button class="user-interactable" onClick={() => props.userDidInteract()} ref={buttonRef}>
        click
      </button>
    </div>
  );
}