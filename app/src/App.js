import React, { useState, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
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
    <div className="App">
      <nav className="navigation">
        <h1>JSCity</h1>
      </nav>
      {selectedBlock && <Card block={selectedBlock} />}
      <div>
        <Canvas
          className="canva"
          orthographic
          camera={{
            position: [-25, 25, -50],
            zoom: 5,
            up: [0, 1, 0],
            far: 1000
          }}>
          <City
            cityBlocks={cityBlocks}
            onSelect={handleSelect}
            selectedBlock={selectedBlock}
          />
          <Controls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
