import fs from 'fs';

class TreeNode {
  public path: string;
  public children: Array<TreeNode>;

  constructor(path: string) {
    this.path = path;
    this.children = [];
  }
}

function buildDirectoryTree(root: TreeNode): TreeNode {
  const stack = [root];

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode) {
      const children = fs.readdirSync(currentNode.path);

      for (let child of children) {
        const childPath = `${currentNode.path}/${child}`;
        const childNode = new TreeNode(childPath);

        if (fs.statSync(childNode.path).isDirectory()) {
          stack.push(childNode);
        }

        currentNode.children.push(childNode);
      }
    }
  }

  return root;
}

function treeFolder(rootPath: string) {
  const root = new TreeNode(rootPath);
  return buildDirectoryTree(root);
}

export { treeFolder };
