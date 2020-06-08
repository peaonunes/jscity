// import fs from 'fs';

class TreeNode {
  public path: string;
  public children: Array<TreeNode>;

  constructor(path: string) {
    this.path = path;
    this.children = [];
  }
}

function buildTree(rootPath: string) {
  const root = new TreeNode(rootPath);

  return root;
}

export { buildTree };
