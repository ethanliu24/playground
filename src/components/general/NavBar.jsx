import { Link } from 'react-router-dom';
import { icons } from '../../utils/icons.js';
import { useState } from 'react';

export default function NavBar() {
  const [blockTransition, setBlockTransition] = useState(JSON.parse(localStorage.getItem("blockTransition")) || false);

  const handleBlockTransition = () => {
    setBlockTransition(b => !b);
    localStorage.setItem("blockTransition", JSON.stringify(!blockTransition));
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
          <img src={icons.github} className="icon" />
          <span className="tooltip">See repo</span>
        </div>
      </div>
    </nav>
  );
}