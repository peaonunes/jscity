import React, { Suspense, useRef } from 'react';
import { Canvas } from 'react-three-fiber';

import Controls from './Controls';
import City from './City';
import data from './data';
import buildCityBlocks from './createCity';

function App() {
  const ref = useRef(null);
  const cityBlocks = buildCityBlocks(data);

  return (
    <div className="App">
      <h1>Hello JSCity</h1>
      <div ref={ref}>
        <Canvas
          className="canva"
          orthographic
          camera={{
            position: [0, 25, -50],
            zoom: 10,
            up: [0, 1, 1],
            far: 1000
          }}>
          <Suspense fallback={'loading...'}>
            <City cityBlocks={cityBlocks} />
          </Suspense>
          <Controls canvas={ref} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
