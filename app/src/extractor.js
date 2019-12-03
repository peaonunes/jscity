import * as babelParser from '@babel/parser';
import get from 'lodash/get';

function getStartLine(node) {
  return get(node, 'loc.start.line');
}

function getEndLine(node) {
  return get(node, 'loc.end.line');
}

function getNodeId(node) {
  return get(node, 'id.name');
}

function countLoc({ loc }) {
  const startLine = loc.start.line;
  const endLine = loc.end.line;
  return endLine - startLine + 1;
}

function traverse(node, parent, blocks, getId) {
  switch (node.type) {
    case 'FunctionDeclaration':
      const id = getId();
      blocks[id] = {
        id,
        type: node.type,
        name: getNodeId(node),
        startLine: getStartLine(node),
        endLine: getEndLine(node),
        loc: countLoc(node),
        children: []
      };

      // node.body type: "BlockStatement" therefore we should look for body of the block
      const callExpressionsCount = node.body.body.reduce((acc, child) => {
        return acc + traverse(child, id, blocks, getId);
      }, 0);

      if (parent != null) {
        blocks[parent].children.push(id);
        blocks[id].parent = parent;
      }

      blocks[id].cec = callExpressionsCount;
      return callExpressionsCount;
    case 'File':
      const block = {
        id: getId(),
        name: node.type,
        type: node.type,
        parent: 'Project',
        loc: countLoc(node),
        startLine: getStartLine(node),
        endLine: getEndLine(node),
        children: []
      };
      blocks[block.id] = block;
      blocks[block.id].cec = traverse(node.program, block.id, blocks, getId);
      return blocks[block.id].cec;
    case 'Program':
      return node.body.reduce((acc, child) => {
        return acc + traverse(child, parent, blocks, getId);
      }, 0);
    case 'ExpressionStatement':
      return traverse(node.expression, parent, blocks, getId);
    case 'CallExpression':
      return 1;
    default:
      return 0;
  }
}

function extract(sourceFiles) {
  let counter = 0;
  function getId() {
    return counter++;
  }

  const blocks = {};

  const project = {
    id: 'Project',
    type: 'Project'
  };

  sourceFiles.forEach(sourceFile => {
    const ast = babelParser.parse(sourceFile.content, {
      sourceType: 'module',
      plugins: ['jsx']
    });
    traverse(ast, null, blocks, getId);
  });

  const files = Object.keys(blocks).filter(key => blocks[key].type === 'File');
  project.loc = files.reduce((sum, key) => sum + (blocks[key].loc || 0), 0);
  project.cec = files.reduce((sum, key) => sum + (blocks[key].cec || 0), 0);
  project.children = files.map(key => blocks[key].id);
  blocks[project.id] = project;

  return blocks;
}

export default extract;
