import React, { useState, useMemo } from 'react';
import get from 'lodash/get';

import buildCity from './cityFactory';
import parse from './parser';

import Navigation from './Navigation';
import Details from './Details';
import GitHub from './GitHub';
import Scene from './Scene';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [sourceCode, setCodeSource] = useState();

  const handleUpload = files => {
    if (files == null) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setCodeSource(fileReader.result);
    };
    fileReader.readAsText(files[0]);
  };

  const handleSelect = block => {
    if (block.id === get(selectedBlock, 'id', '')) {
      setSelectedBlock(null);
    } else {
      setSelectedBlock(block);
    }
  };

  const toggleAutoRotate = () => setAutoRotate(!autoRotate);

  const city = useMemo(() => {
    if (!sourceCode) return {};
    const nodes = parse(sourceCode);
    return buildCity(nodes);
  }, [sourceCode]);

  return (
    <React.Fragment>
      <Navigation
        autoRotate={autoRotate}
        setAutoRotate={toggleAutoRotate}
        handleUpload={handleUpload}
      />
      {selectedBlock && <Details block={selectedBlock} />}
      <Scene
        city={city}
        selectedBlock={selectedBlock}
        onSelect={handleSelect}
        autoRotate={autoRotate}
      />
      <GitHub />
    </React.Fragment>
  );
}

export default App;
