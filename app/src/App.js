import React, { useRef, useState, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import get from 'lodash/get';

import buildCityBlocks from './createCity';
import Controls from './Controls';
import City from './City';
import Card from './Card';
import data from './data';

function App() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const cityBlocks = useMemo(() => buildCityBlocks(data), []);
  const ref = useRef(null);

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
      <div ref={ref}>
        <Canvas
          className="canva"
          orthographic
          camera={{
            position: [-25, 25, -50],
            zoom: 5,
            up: [0, 1, 0],
            far: 1000
          }}>
          {/*
            <pointLight args={['0xffffff', 1, 1000]} position={[0, 25, -25]} />
          */}
          <City
            cityBlocks={cityBlocks}
            onSelect={handleSelect}
            selectedBlock={selectedBlock}
          />
          <Controls canvas={ref} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
