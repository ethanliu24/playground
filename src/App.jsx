import { Routes, Route } from "react-router-dom";
import bgImg from "./bgImgs.js";
import PageTransition from "./components/common/PageTransition.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
      title: "Hey Hello",
      subtitle: "I got diabetes ahsdkfhjsa sdljkf asflkkasd h",
      clipVisual: bgImg.forestGIF,
    }
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
            />
          }
        />
      })}
    </Routes>
  );
}

export default App;
