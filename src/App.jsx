import { Routes, Route } from "react-router-dom";
import PageTransition from "./components/common/PageTransition.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const routes = [
    {
      path: "/", element: <Home />, title: "Hey", subtitle: "I got diabetes", clipVisual: "",
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
              clipVisual={data.clipVisual}
            />
          }
        />
      })}
    </Routes>
  );
}

export default App;
