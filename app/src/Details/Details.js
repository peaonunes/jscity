import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import blocksPallet from '../blocksPallet';
import styles from './Details.module.css';

function Details({ block }) {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className={styles.details}>
      <div className={styles.title}>
        <strong className={styles.ellipsis} title={get(block, 'name', '')}>
          {get(block, 'name', '')}
        </strong>
        <button className={styles.toggle} onClick={toggleOpen}>
          {open && '🙈'}
          {!open && '🐵'}
        </button>
      </div>
      {open && (
        <React.Fragment>
          <div className={styles.divider} />
          <div className={styles.content}>
            <div className={styles.ellipsis} title={get(block, 'id', '')}>
              <strong>Id: </strong>
              {get(block, 'id', '')}
            </div>
            <div className={styles.ellipsis} title={get(block, 'type', '')}>
              <strong>Type: </strong>
              <span style={{ color: blocksPallet[get(block, 'type', '')] }}>
                ●{' '}
              </span>
              {get(block, 'type', '')}
            </div>
            <div className={styles.ellipsis} title={get(block, 'loc', '')}>
              <strong>Lines of Code: </strong>
              {get(block, 'loc', '')}
            </div>
            <div className={styles.ellipsis} title={get(block, 'cec', '')}>
              <strong>Call Expressions: </strong>
              {get(block, 'cec', '')}
            </div>
            <div
              className={styles.ellipsis}
              title={get(block, 'startLine', '')}>
              <strong>Start line: </strong>
              {get(block, 'startLine', '')}
            </div>
            <div className={styles.ellipsis} title={get(block, 'endLine', '')}>
              <strong>End line: </strong>
              {get(block, 'endLine', '')}
            </div>
            <div className={styles.ellipsis} title={get(block, 'parent', '')}>
              <strong>Parent id: </strong>
              {get(block, 'parent', '')}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Details.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    loc: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    ).isRequired,
    cec: PropTypes.number.isRequired,
    startLine: PropTypes.number,
    endLine: PropTypes.number,
    parent: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
  }).isRequired
};

export default Details;
