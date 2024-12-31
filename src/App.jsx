import { Routes, Route } from "react-router-dom";
import { bgImg, transitionAudio } from "./utils/transitionAssets.js";
import * as Constants from "./utils/constants.js";
import PageWrapper from "./components/transition/PageWrapper.jsx";
import Home from "./components/home/Home.jsx";
import NavBar from "./components/general/NavBar.jsx";

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
    constructRouteData(Constants.HOME_ROUTE, Home, "OH HEY", "SO YOU'VE CAME HERE HUH", bgImg.forestGIF, transitionAudio.botanica1),
  ];

  return (
    <>
      <NavBar />
      <Routes>
        {routes.map((data) => {
          return <Route
            key={data.path}
            path={data.path}
            element={
              <PageWrapper
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
    </>
  );
}

export default App;
