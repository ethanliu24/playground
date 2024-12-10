import { Routes, Route } from "react-router-dom";
import PageTransition from "./components/common/PageTransition.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const pathToNature = "src/assets/nature/"; // In React, paths are relative to the public
  const routes = [
    {
      path: "/",
      element: <Home />,
      title: "Hey Hello",
      subtitle: "I got diabetes ahsdkfhjsa sdljkf asflkkasd h",
      clipVisual: "forest.gif",
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
              clipVisualPath={pathToNature + data.clipVisual}
            />
          }
        />
      })}
    </Routes>
  );
}

export default App;
