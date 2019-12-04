import * as babelParser from '@babel/parser';
import get from 'lodash/get';

import nodeTypes from './nodeTypes';

function getStartLine(node) {
  return get(node, 'loc.start.line');
}

function getEndLine(node) {
  return get(node, 'loc.end.line');
}

function getNodeId(node) {
  return get(node, 'id.name', '');
}

function countLoc({ loc }) {
  const startLine = loc.start.line;
  const endLine = loc.end.line;
  return endLine - startLine + 1;
}

function newNode(node, getId) {
  return {
    id: getId(),
    name: getNodeId(node),
    type: node.type,
    loc: countLoc(node),
    startLine: getStartLine(node),
    endLine: getEndLine(node),
    children: []
  };
}

function traverse(root, parent, nodes, getId) {
  let callExpressionsCount = 0;

  switch (root.type) {
    case nodeTypes.FUNCTION:
    case nodeTypes.FILE:
      const node = newNode(root, getId);

      nodes[node.id] = node;
      nodes[parent].children.push(node.id);
      nodes[node.id].parent = parent;

      if (node.type === nodeTypes.FUNCTION) {
        callExpressionsCount = traverse(root.body, node.id, nodes, getId);
      } else {
        callExpressionsCount = traverse(root.program, node.id, nodes, getId);
      }

      nodes[node.id].cec = callExpressionsCount;

      return callExpressionsCount;
    case nodeTypes.PROGRAM:
    case nodeTypes.BLOCK:
      return root.body.reduce((acc, child) => {
        return acc + traverse(child, parent, nodes, getId);
      }, 0);
    case nodeTypes.EXPRESSION:
      return traverse(root.expression, parent, nodes, getId);
    case nodeTypes.CALL_EXPRESSION:
      return 1;
    default:
      return 0;
  }
}

function parse(sourceCode) {
  let counter = 0;
  function getId() {
    return counter++;
  }

  const nodes = {};
  const project = {
    id: nodeTypes.PROJECT,
    type: nodeTypes.PROJECT,
    children: []
  };
  nodes[project.id] = project;

  const ast = babelParser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  traverse(ast, nodeTypes.PROJECT, nodes, getId);

  const files = Object.keys(nodes).filter(
    key => nodes[key].type === nodeTypes.FILE
  );
  const projectLoc = files.reduce((sum, key) => sum + (nodes[key].loc || 0), 0);
  const projectCec = files.reduce((sum, key) => sum + (nodes[key].cec || 0), 0);
  nodes[project.id].loc = projectLoc;
  nodes[project.id].cec = projectCec;

  return nodes;
}

export default parse;
