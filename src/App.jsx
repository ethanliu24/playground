import { Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/common/PageTransition.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<PageTransition page={<Home />} />} />
    </Routes>
  );
}

export default App;
