import PropTypes from 'prop-types';
import React from 'react';

import Block from './Block';

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="#377eb8" />
  </mesh>
);

function City({ cityBlocks, selectedBlock, onSelect }) {
  return (
    <React.Fragment>
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
      <Plane />
    </React.Fragment>
  );
}

City.propTypes = {
  cityBlocks: PropTypes.object.isRequired
};

export default City;
