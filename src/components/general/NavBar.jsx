import { Link } from 'react-router-dom';
import { icons } from '../../utils/icons.js';
import { useState } from 'react';

export default function NavBar() {
  const [blockTransition, setBlockTransition] = useState(true); // TODO use local storage

  const handleBlockTransition = () => {
    setBlockTransition(b => !b);
  }

  return (
    <nav className="nav-bar">
      <div className="nav-home"><Link to="/">Home</Link></div>
      <div className="nav-right">
        <img src={blockTransition ? icons.blockTransition : icons.allowTransition}
          id="allow-transition-icon"
          className="icon"
          onClick={handleBlockTransition} />
        <img src={icons.github} className="icon" />
      </div>
    </nav>
  );
}