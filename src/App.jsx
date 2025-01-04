import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { bgImg, transitionAudio } from "./utils/transitionAssets.js";
import * as Constants from "./utils/constants.js";
import PageWrapper from "./components/transition/PageWrapper.jsx";
import NavBar from "./components/general/NavBar.jsx";
import Home from "./components/home/Home.jsx";
import Redirect from "./components/general/Redirect.jsx";

function App() {
  const constructRouteData = (path, element, title, subtitle, clipVisual, audioData, extraProps) => {
    return {
      path: path,
      element: element,
      title: title,
      subtitle: subtitle,
      clipVisual: clipVisual,
      audioData: audioData,
      extraProps: extraProps,
    }
  }

  // These routes are intended for pages that needs a page animation
  const routes = [
    constructRouteData(Constants.HOME_ROUTE, Home, "OH HEY", "YOU'VE CAME HERE", bgImg.skyGIF, transitionAudio.botanica2, {}),
    constructRouteData(Constants.PORTFOLIO_ROUTE, Redirect, "STALK ME PROFESIONALLY", "LINKED IN MODE ACTIVATED", bgImg.forestGIF, transitionAudio.botanica1,
      {
        link: "https://ethanliu24.github.io/portfolio/",
      }),
  ];

  return (
    <Suspense>
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
                extraProps={data.extraProps}
              />
            }
          />
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
