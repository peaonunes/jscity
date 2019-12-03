import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import React from 'react';

import Controls from './Controls';
import City from './City';

function Scene({ cityBlocks, selectedBlock, onSelect, autoRotate }) {
  return (
    <Canvas
      className="canva"
      orthographic
      camera={{
        position: [25, 25, 55],
        zoom: 5,
        up: [0, 1, 0],
        far: 1000
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}>
      <ambientLight intensity={0.75} />
      <spotLight position={[0, 50, 100]} penumbra={1} castShadow />
      <City
        cityBlocks={cityBlocks}
        selectedBlock={selectedBlock}
        onSelect={onSelect}
      />
      <Controls autoRotate={autoRotate} />
    </Canvas>
  );
}

export default Scene;
