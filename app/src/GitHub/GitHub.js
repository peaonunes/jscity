import React from 'react';

import styles from './GitHub.module.css';

function GitHub() {
  return (
    <div className={styles.github}>
      <a
        href="https://github.com/peaonunes/jscity"
        target="_blank"
        rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  );
}

export default GitHub;
