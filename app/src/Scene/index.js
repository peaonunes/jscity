import { Canvas } from 'react-three-fiber';
import React, { useMemo } from 'react';
import * as THREE from 'three';

import buildCityBlocks from './createCity';
import Controls from './Controls';
import City from './City';
import extract from './../extractor';

function Scene({ sourceCode, selectedBlock, onSelect, autoRotate }) {
  const cityBlocks = useMemo(() => {
    if (!sourceCode) return {};
    const hierarchy = extract(sourceCode);
    return buildCityBlocks(hierarchy);
  }, [sourceCode]);

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
