import React, { useState } from 'react';

import './Navigation.css';

function Navigation({ autoRotate, setAutoRotate, handleUpload }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <nav className="navigation">
      <h1>JSCity</h1>
      <div className="menu">
        <div className="settings">
          <div>
            <label htmlFor="upload">
              <span role="img" aria-label="upload">
                📂
              </span>{' '}
              upload file
            </label>
            <input
              style={{ display: 'none' }}
              id="upload"
              type="file"
              accept=".js,.jsx"
              onChange={e => handleUpload(e.target.files)}
            />
          </div>
          <button className="toggle" onClick={toggleOpen}>
            <span role="img" aria-label="open settings">
              ⚙️
            </span>
          </button>
        </div>
        {open && (
          <React.Fragment>
            <div className="divider" />
            <div className="options">
              <div className="option">
                <input
                  id="autoRotate"
                  type="checkbox"
                  value={autoRotate}
                  checked={autoRotate}
                  onChange={setAutoRotate}
                />
                <label htmlFor="autoRotate">auto rotate</label>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}
export default Navigation;
