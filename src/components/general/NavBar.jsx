import { Link } from 'react-router-dom';
import { icons } from '../../utils/icons.js';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [blockTransition, setBlockTransition] = useState(JSON.parse(localStorage.getItem("blockTransition")) || false);
  const [theme, setTheme] = useState("light"); // might add different themes

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    const bodyElem = document.body;
    setTheme(currentTheme);
    bodyElem.classList.add(currentTheme);
  }, []);

  const handleBlockTransition = () => {
    setBlockTransition(b => !b);
    localStorage.setItem("blockTransition", JSON.stringify(!blockTransition));
  }

  const handleTheme = () => {
    const bodyElem = document.body;
    bodyElem.classList.remove(theme);
    const newTheme = theme === "light" ? "dark" : "light";
    bodyElem.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return icons.lightTheme;
      case "dark":
        return icons.darkTheme;
      default:
        return icons.darkTheme;
    }
  }

  return (
    <nav className="nav-bar">
      <div className="nav-home"><Link to="/">Home</Link></div>
      <div className="nav-right">
        <div className="tooltip-ref-obj">
          <img src={blockTransition ? icons.blockTransition : icons.allowTransition}
            id="allow-transition-icon"
            className="icon"
            onClick={handleBlockTransition} />
          <span className="tooltip">Block transitions</span>
        </div>

        <div className="tooltip-ref-obj">
          <img src={getThemeIcon()}
            id="theme-icon"
            className="icon"
            onClick={handleTheme} />
          <span className="tooltip">Theme</span>
        </div>

        <div className="tooltip-ref-obj">
          <a href="https://github.com/ethanliu24/playground" target="_blank" rel="noopener noreferrer">
            <img src={icons.github} className="icon" />
          </a>
          <span className="tooltip">See repo</span>
        </div>
      </div>
    </nav>
  );
}