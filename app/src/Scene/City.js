import PropTypes from 'prop-types';
import React from 'react';

import Block from './Block';

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="#377eb8" />
  </mesh>
);

function City({ city, selectedBlock, onSelect }) {
  return (
    <React.Fragment>
      <group>
        {Object.keys(city).map(blockId => (
          <Block
            key={blockId}
            block={city[blockId]}
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
  city: PropTypes.object.isRequired,
  selectedBlock: PropTypes.object,
  onSelect: PropTypes.func
};

export default City;
