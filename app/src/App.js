import React, { useState } from 'react';
import get from 'lodash/get';

import Scene from './Scene';
import Card from './Card';

//import data from './sample/data';
import Navigation from './Navigation';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [sourceCode, setCodeSource] = useState();
  const handleUpload = files => {
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

  return (
    <React.Fragment>
      <Navigation
        autoRotate={autoRotate}
        setAutoRotate={toggleAutoRotate}
        handleUpload={handleUpload}
      />
      {selectedBlock && <Card block={selectedBlock} />}
      <Scene
        sourceCode={sourceCode}
        selectedBlock={selectedBlock}
        onSelect={handleSelect}
        autoRotate={autoRotate}
      />
    </React.Fragment>
  );
}

export default App;
