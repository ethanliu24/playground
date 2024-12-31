import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../utils/icons.js';
import { BLOCK_TRANSITION, THEME, HOME_ROUTE, LIGHT, DARK } from '../../utils/constants.js';

export default function NavBar() {
  const [blockTransition, setBlockTransition] = useState(JSON.parse(localStorage.getItem(BLOCK_TRANSITION)) || false);
  const [theme, setTheme] = useState(LIGHT); // might add different themes

  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME);
    setTheme(currentTheme);
    document.documentElement.classList.add(currentTheme);
  }, []);

  const handleBlockTransition = () => {
    setBlockTransition(b => !b);
    localStorage.setItem(BLOCK_TRANSITION, JSON.stringify(!blockTransition));
  }

  const handleTheme = () => {
    // Tbh idk if it's a good practice to put theme classes in the html tag
    document.documentElement.classList.remove(theme);
    const newTheme = theme === LIGHT ? DARK : LIGHT;
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem(THEME, newTheme);
  }

  const getThemeIcon = () => {
    switch (theme) {
      case LIGHT:
        return icons.lightTheme;
      case DARK:
        return icons.darkTheme;
      default:
        return icons.darkTheme;
    }
  }

  return (
    <nav className="nav-bar">
      <div className="nav-home"><Link to={HOME_ROUTE}>Home</Link></div>
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