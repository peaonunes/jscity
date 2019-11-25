import React, { useState } from 'react';

const BlockSelectedContext = React.createContext();

function BlockSelectedProvider(props) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const selectBlock = block => setSelectedBlock(block);
  return (
    <BlockSelectedContext.Provider
      value={{ selectedBlock, selectBlock }}
      {...props}
    />
  );
}

function useSelectedBlock() {
  const context = React.useContext(BlockSelectedContext);
  if (context === undefined) {
    throw new Error(
      `useSelectedBlock must be used within a BlockSelectedProvider`
    );
  }
  return context;
}

export { BlockSelectedProvider, useSelectedBlock };
