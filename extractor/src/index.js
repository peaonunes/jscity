const babelParser = require('@babel/parser');
const get = require('lodash/get');
const fs = require('fs');

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

function getId(node) {
  const name = getNodeId(node);
  const startLine = getStartLine(node);
  const endLine = getEndLine(node);
  return `${name}#${startLine}${endLine}`;
}

function traverse(node, parent, blocks) {
  switch (node.type) {
    case 'FunctionDeclaration':
      const id = getId(node);
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
        return acc + traverse(child, id, blocks);
      }, 0);

      if (parent) {
        blocks[parent].children.push(id);
        blocks[id].parent = parent;
      }

      blocks[id].cec = callExpressionsCount;
      return callExpressionsCount;
    case 'File':
      const fileBlock = {
        id: node.type,
        name: node.type,
        type: node.type,
        parent: 'Project',
        loc: countLoc(node),
        startLine: getStartLine(node),
        endLine: getEndLine(node),
        children: []
      };
      blocks[node.type] = fileBlock;
      blocks[node.type].cec = traverse(node.program, node.type, blocks);
      return blocks[node.type].cec;
    case 'Program':
      return node.body.reduce((acc, child) => {
        return acc + traverse(child, parent, blocks);
      }, 0);
    case 'ExpressionStatement':
      return traverse(node.expression, parent, blocks);
    case 'CallExpression':
      console.log('call');
      return 1;
    default:
      return 0;
  }
}

function parse(fileName) {
  const content = fs.readFileSync(__dirname + fileName, 'utf8');
  const ast = babelParser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  return ast;
}

function buildHierarchy(fileName) {
  const blocks = {};
  const ast = parse(fileName);
  traverse(ast, null, blocks);
  return blocks;
}

const fileName = '/example.js';
const blocks = buildHierarchy(fileName);
//TODO: UPDATE FILE NAME
const projectLoc = Object.keys(blocks)
  .filter(key => blocks[key].type === 'File')
  .reduce((sum, key) => sum + (blocks[key].loc || 0), 0);
const projectCec = Object.keys(blocks)
  .filter(key => blocks[key].type === 'File')
  .reduce((sum, key) => sum + (blocks[key].cec || 0), 0);
const project = {
  id: 'Project',
  type: 'Project',
  children: ['File'],
  loc: projectLoc,
  cec: projectCec
};
blocks[project.id] = project;
console.log('buildHierarchy', blocks);
console.log('buildHierarchy');
console.log(JSON.stringify(blocks));
