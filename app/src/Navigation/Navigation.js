import React, { useState } from 'react';

import styles from './Navigation.module.css';

function Navigation({ autoRotate, setAutoRotate, handleUpload }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <nav className={styles.navigation}>
      <h1>JSCity</h1>
      <div className={styles.menu}>
        <div className={styles.settings}>
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
          <button className={styles.toggle} onClick={toggleOpen}>
            <span role="img" aria-label="open settings">
              ⚙️
            </span>
          </button>
        </div>
        {open && (
          <React.Fragment>
            <div className={styles.divider} />
            <div className={styles.options}>
              <div className={styles.option}>
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
            <div className={styles.options}>
              <a
                href="https://peaonunes.github.io/jscity/example.js"
                target="_blank"
                rel="noopener noreferrer">
                <span role="img" aria-label="download example 1">
                  ⬇
                </span>{' '}
                Example file 1
              </a>
              <a
                href="https://peaonunes.github.io/jscity/example2.js"
                target="_blank"
                rel="noopener noreferrer">
                <span role="img" aria-label="download example 2">
                  ⬇
                </span>{' '}
                Example file 2
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}
export default Navigation;
