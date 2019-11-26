import { BoxBufferGeometry } from 'three';
import React, { useMemo } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

function Block({ block, selectedBlock, onSelect }) {
  const geom = useMemo(() => new BoxBufferGeometry(...block.size), [block]);
  const handleClick = e => {
    e.stopPropagation();
    onSelect(e.eventObject.userData);
  };
  const color = get(selectedBlock, 'id') === block.id ? 'white' : block.color;

  return (
    <mesh
      userData={block}
      position={block.position}
      onClick={handleClick}
      castShadow
      receiveShadow>
      <meshPhysicalMaterial attach="material" color={color} />
      <boxBufferGeometry attach="geometry" args={block.size} />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geom]} />
        <lineBasicMaterial color="black" attach="material" />
      </lineSegments>
    </mesh>
  );
}

Block.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loc: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    cec: PropTypes.number.isRequired,
    parent: PropTypes.string
  }).isRequired,
  selectedBlock: PropTypes.shape({
    id: PropTypes.string
  }),
  onSelect: PropTypes.func.isRequired
};

export default Block;
