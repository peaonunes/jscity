import path from 'path';

import { treeFolder } from './../src/treeFolder';

describe('treeFolder', () => {
  const initialPath = path.join(__dirname, 'fixtures');

  it('should return root node', () => {
    const rootNode = treeFolder(initialPath);
    expect(rootNode).not.toBeNull();
    expect(rootNode).toHaveProperty('path', initialPath);
    expect(rootNode).toHaveProperty('children');
  });

  it('should return root node with its exact 2 children', () => {
    const rootNode = treeFolder(initialPath);
    expect(rootNode.children.length).toEqual(2);

    const childrenPath = rootNode.children.map(child => child.path);
    expect(childrenPath.includes(`${initialPath}/utils`)).toEqual(true);
    expect(childrenPath.includes(`${initialPath}/example.js`)).toEqual(true);
  });

  it('should add utils node with its children inside root', () => {
    const rootNode = treeFolder(initialPath);
    const utils = rootNode.children.find(
      child => child.path === `${initialPath}/utils`
    );

    expect(utils).not.toBeNull();
    expect(utils?.children.length).toEqual(1);
    expect(utils?.children[0]?.path).toEqual(`${initialPath}/utils/sum.js`);
  });
});
