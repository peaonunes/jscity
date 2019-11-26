import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import blocksPallet from '../blocksPallet';
import './Card.css';

function Card({ block }) {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className="card">
      <div className="title">
        <strong>{block.name}</strong>
        <button className="toggle" onClick={toggleOpen}>
          {open && '🙈'}
          {!open && '🐵'}
        </button>
      </div>
      {open && (
        <React.Fragment>
          <div className="divider" />
          <div className="details">
            <div>
              <strong>Id: </strong>
              {get(block, 'id', '')}
            </div>
            <div>
              <strong>Type: </strong>
              <span style={{ color: blocksPallet[get(block, 'type', '')] }}>
                ●{' '}
              </span>
              {get(block, 'type', '')}
            </div>
            <div>
              <strong>Lines of Code: </strong>
              {get(block, 'loc', '')}
            </div>
            <div>
              <strong>Call Expressions: </strong>
              {get(block, 'cec', '')}
            </div>
            <div>
              <strong>Start line: </strong>
              {get(block, 'startLine', '')}
            </div>
            <div>
              <strong>End line: </strong>
              {get(block, 'endLine', '')}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Card.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loc: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    cec: PropTypes.number.isRequired,
    startLine: PropTypes.number,
    endLine: PropTypes.number,
    parent: PropTypes.string
  }).isRequired
};

export default Card;
