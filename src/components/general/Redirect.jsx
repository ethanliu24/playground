import { useEffect } from "react";

export default function Redirect(props) {
  useEffect(() => {
    props.loadingComplete();
  }, []);

  useEffect(() => {
    if (props.animationCompleted) {
      window.location.href = props.extraProps.link;
    };
  }, [props.animationCompleted]);

  return <div className="redirect">Redirecting...</div>;
}