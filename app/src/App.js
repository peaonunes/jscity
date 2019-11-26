import React, { useState, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import get from 'lodash/get';

import City, { buildCityBlocks } from './City';
import Controls from './Controls';
import Card from './Card';

import data from './sample/data';

function App() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const cityBlocks = useMemo(() => buildCityBlocks(data), []);

  const handleSelect = block => {
    if (block.id === get(selectedBlock, 'id', '')) {
      setSelectedBlock(null);
    } else {
      setSelectedBlock(block);
    }
  };

  return (
    <React.Fragment>
      <nav className="navigation">
        <h1>JSCity</h1>
      </nav>
      {selectedBlock && <Card block={selectedBlock} />}
      <Canvas
        className="canva"
        orthographic
        camera={{
          position: [-25, 25, -55],
          zoom: 5,
          up: [0, 1, 0],
          far: 1000
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}>
        <ambientLight intensity={0.75} />
        <spotLight position={[0, 50, -55]} penumbra={1} castShadow />
        <City
          cityBlocks={cityBlocks}
          onSelect={handleSelect}
          selectedBlock={selectedBlock}
        />
        <Controls />
      </Canvas>
    </React.Fragment>
  );
}

export default App;
