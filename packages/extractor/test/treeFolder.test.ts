import path from 'path';

import { treeFolder } from './../src/treeFolder';

describe('treeFolder', () => {
  const initialPath = path.join(__dirname, 'fixtures', '/');

  it('should return root node', () => {
    const rootNode = treeFolder(initialPath);
    expect(rootNode).not.toBeNull();
    expect(rootNode).toHaveProperty('path', initialPath);
    expect(rootNode).toHaveProperty('children');
  });

  // it('should return 2 children', () => {
  //   const rootNode = treeFolder(initialPath);
  //   expect(rootNode.children.length).toEqual(2);
  // });
});
