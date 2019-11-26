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
        <strong className="ellipsis" title={get(block, 'name', '')}>
          {get(block, 'name', '')}
        </strong>
        <button className="toggle" onClick={toggleOpen}>
          {open && '🙈'}
          {!open && '🐵'}
        </button>
      </div>
      {open && (
        <React.Fragment>
          <div className="divider" />
          <div className="details">
            <div className="ellipsis" title={get(block, 'id', '')}>
              <strong>Id: </strong>
              {get(block, 'id', '')}
            </div>
            <div className="ellipsis" title={get(block, 'type', '')}>
              <strong>Type: </strong>
              <span style={{ color: blocksPallet[get(block, 'type', '')] }}>
                ●{' '}
              </span>
              {get(block, 'type', '')}
            </div>
            <div className="ellipsis" title={get(block, 'loc', '')}>
              <strong>Lines of Code: </strong>
              {get(block, 'loc', '')}
            </div>
            <div className="ellipsis" title={get(block, 'cec', '')}>
              <strong>Call Expressions: </strong>
              {get(block, 'cec', '')}
            </div>
            <div className="ellipsis" title={get(block, 'startLine', '')}>
              <strong>Start line: </strong>
              {get(block, 'startLine', '')}
            </div>
            <div className="ellipsis" title={get(block, 'endLine', '')}>
              <strong>End line: </strong>
              {get(block, 'endLine', '')}
            </div>
            <div className="ellipsis" title={get(block, 'parent', '')}>
              <strong>Parent id: </strong>
              {get(block, 'parent', '')}
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
