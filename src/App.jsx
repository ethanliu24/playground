import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "motion/react";
import Home from "./components/Home/Home.jsx"

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
