import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function Entry(props) {
  const orbRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;

    orb.addEventListener("mouseenter", () => {
      gsap.to(orb, {
        scale: 1.2,
        duration: 1,
        ease: "elastic.out",
      });
    });

    orb.addEventListener("mouseleave", () => {
      gsap.to(orb, {
        scale: 1,
        duration: 1,
        ease: "elastic.out",
      });
    });

    orb.addEventListener("click", () => {
      gsap.to(orbRef.current, {
        "--entry-fade": "100%",
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          props.userDidInteract();
        },
      });
    })

    return () => {
      orb.removeEventListener("mouseenter", () => {});
      orb.removeEventListener("mouseleave", () => {});
      orb.removeEventListener("click", () => {});
    };
  }, []);

  const handleClick = () => {
    // props.userDidInteract();
  }

  return (
    <div id="entry-container">
      <button className="user-interactable" ref={orbRef}>
        click
      </button>
    </div>
  );
}