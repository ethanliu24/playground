import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function Entry(props) {
  const orbRef = useRef(null);
  const reminderRef = useRef(null);

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
      gsap.to(reminderRef.current, {
        scale: 0,
        y: 30,
        duration: 0.3,
        ease: "power4.out",
      });

      gsap.to(orbRef.current, {
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

  return (
    <div id="entry-container">
      <button className="user-interactable" ref={orbRef}>
        click
      </button>

      <div className="get-headphones-reminder" ref={reminderRef}>
        <div>reminder - there will be sounds</div>
      </div>
    </div>
  );
}