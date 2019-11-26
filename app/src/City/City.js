import PropTypes from 'prop-types';
import React from 'react';

import Block from './Block';

function City({ cityBlocks, selectedBlock, onSelect }) {
  return (
    <group>
      {Object.keys(cityBlocks).map(blockId => (
        <Block
          key={blockId}
          block={cityBlocks[blockId]}
          selectedBlock={selectedBlock}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

City.propTypes = {
  cityBlocks: PropTypes.object.isRequired
};

export default City;
