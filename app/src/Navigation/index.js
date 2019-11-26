import React from 'react';

import './Navigation.css';

function Navigation({ autoRotate, setAutoRotate }) {
  return (
    <nav className="navigation">
      <h1>JSCity</h1>
      <div className="settings">
        <span role="img" aria-label="Settings">
          ⚙️
        </span>
        <label htmlFor="autoRotate">auto rotate</label>
        <input
          id="autoRotate"
          type="checkbox"
          value={autoRotate}
          checked={autoRotate}
          onChange={setAutoRotate}
        />
      </div>
    </nav>
  );
}
export default Navigation;
