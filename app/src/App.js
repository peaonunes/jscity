import React, { useState, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import buildCityBlocks from './createCity';
import extract from './extractor';

import Navigation from './Navigation';
import Details from './Details';
import Scene from './Scene';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [filesCount, setFilesCount] = useState(null);
  const [sourceCode, setCodeSource] = useState([]);

  const handleUpload = files => {
    if (files === null) return;
    setFilesCount(files.length);
    Array.from(files).forEach(file => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setCodeSource(prevState => [
          ...prevState,
          { name: file.name, content: fileReader.result }
        ]);
      };
      fileReader.readAsText(file);
    });
  };

  const handleSelect = block => {
    if (block.id === get(selectedBlock, 'id', '')) {
      setSelectedBlock(null);
    } else {
      setSelectedBlock(block);
    }
  };

  const toggleAutoRotate = () => setAutoRotate(!autoRotate);

  const cityBlocks = useMemo(() => {
    if (!isEmpty(sourceCode) && sourceCode.length === filesCount) {
      const hierarchy = extract(sourceCode);
      return buildCityBlocks(hierarchy);
    }
    return {};
  }, [sourceCode, filesCount]);

  return (
    <React.Fragment>
      <Navigation
        autoRotate={autoRotate}
        setAutoRotate={toggleAutoRotate}
        handleUpload={handleUpload}
      />
      {selectedBlock && <Details block={selectedBlock} />}
      <Scene
        cityBlocks={cityBlocks}
        selectedBlock={selectedBlock}
        onSelect={handleSelect}
        autoRotate={autoRotate}
      />
    </React.Fragment>
  );
}

export default App;
