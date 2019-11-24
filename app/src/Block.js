import PropTypes from 'prop-types';
import React from 'react';

function Block({ block }) {
  console.group(block.id);
  console.log('position', block.position);
  console.log('size', block.size);
  console.groupEnd();
  //https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
  // BoxGeometry(width: Float, height: Float, depth :Float)
  return (
    <mesh userData={block} position={block.position}>
      <meshBasicMaterial attach="material" color={block.color} />
      <boxGeometry attach="geometry" args={block.size} />
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
  }).isRequired
};

export default Block;
