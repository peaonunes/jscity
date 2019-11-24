import times from 'lodash/times';
import React from 'react';

import Block from './Block';

function City({ cityBlocks }) {
  return (
    <group>
      {Object.keys(cityBlocks).map(blockId => (
        <Block key={blockId} block={cityBlocks[blockId]} />
      ))}
    </group>
  );
}

export default City;
