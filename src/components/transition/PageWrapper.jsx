import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import Entry from "./Entry.jsx";
import Transition from "./Transition.jsx";
import { BLOCK_TRANSITION } from "../../utils/constants.js";

gsap.registerPlugin(useGSAP);

export default function PageWrapper(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const blockTransition = JSON.parse(localStorage.getItem(BLOCK_TRANSITION));
    if (blockTransition) {
      setUserInteracted(true);
      setAnimationCompleted(true);
    }
  }, []);

  const loadingComplete = useCallback(() => {
    setIsLoading(false);
  });

  const userDidInteract = useCallback(() => {
    setUserInteracted(true);
  })

  const animationComplete = useCallback(() => {
    setAnimationCompleted(true);
  })

  // The page to display after the animations
  const Page = props.page;

  /* It is neccessary that we load both the Loading and the other components together because
   * we set the isLoading state to false after the child component is mounted and loaded.
   * If we just return a Loading component, the isLoading state will never be updated.
   * There's gotta be a better solution than this, as the loading page can't tell when a page will
   * finish loading lmao.
   */
  return (
    <>
      { isLoading ? <Loading /> : null }

      { !isLoading && !userInteracted ? <Entry userDidInteract={userDidInteract} /> : null }

      <div className="dummy-container" style={{ display: !isLoading && userInteracted ? "block" : "none" }}>
        { !animationCompleted ? (
            <Transition
              title={props.title}
              subtitle={props.subtitle}
              clipVisualPath={props.clipVisualPath}
              audioData={props.audioData}
              animationComplete={animationComplete}
              isLoading={isLoading}
              userInteracted={userInteracted} />
          ) : null
        }

        <Page loadingComplete={loadingComplete} animationCompleted={animationCompleted} extraProps={props.extraProps}/>
      </div>
    </>
  );
}