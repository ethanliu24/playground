import { Routes, Route } from "react-router-dom";
import { bgImg, bgAudio } from "./utils/transitionAssets.js";
import PageTransition from "./components/transition/PageTransition.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const constructRouteData = (path, element, title, subtitle, clipVisual, audioData) => {
    return {
      path: path,
      element: element,
      title: title,
      subtitle: subtitle,
      clipVisual: clipVisual,
      audioData: audioData
    }
  }

  // These routes are intended for pages that needs a page animation
  const routes = [
    constructRouteData("/", Home, "OH HEY", "SO YOU'VE CAME HERE HUH", bgImg.forestGIF, bgAudio.botanica1),
  ];

  return (
    <Routes>
      {routes.map((data) => {
        return <Route
          key={data.path}
          path={data.path}
          element={
            <PageTransition
              page={data.element}
              title={data.title}
              subtitle={data.subtitle}
              clipVisualPath={data.clipVisual}
              audioData={data.audioData}
            />
          }
        />
      })}
    </Routes>
  );
}

export default App;
