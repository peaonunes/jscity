import React, { useMemo } from 'react';
import { BoxBufferGeometry } from 'three';
import PropTypes from 'prop-types';

function Block({ block }) {
  const geom = useMemo(() => new BoxBufferGeometry(...block.size), [block]);
  //https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
  // BoxGeometry(width: Float, height: Float, depth :Float)
  return (
    <mesh userData={block} position={block.position}>
      <meshBasicMaterial attach="material" color={block.color} />
      <boxBufferGeometry attach="geometry" args={block.size} />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geom]} />
        <lineBasicMaterial color="black" attach="material" linewidth="" />
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
  }).isRequired
};

export default Block;
