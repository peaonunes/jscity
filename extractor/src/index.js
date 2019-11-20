const babelParser = require('@babel/parser');
const fs = require('fs');

function countLoc({ loc }) {
  const startLine = loc.start.line;
  const endLine = loc.end.line;
  return endLine - startLine + 1;
}

function getId({ id, loc }) {
  const name = id.name;
  const startLine = loc.start.line;
  const endLine = loc.end.line;
  return `${name}#${startLine}${endLine}`;
}

function traverse(node, parent, blocks) {
  switch (node.type) {
    case 'FunctionDeclaration':
      console.log(node);
      const id = getId(node);
      const loc = countLoc(node);
      blocks[id] = {
        type: node.type,
        id,
        loc,
        children: []
      };

      // node.body type: "BlockStatement" therefore we should look for body of the block
      const callExpressionsCount = node.body.body.reduce((acc, child) => {
        return acc + traverse(child, node, blocks);
      }, 0);

      if (parent) {
        const parentId = getId(parent);
        blocks[parentId].children.push(id);
        blocks[id].parent = parentId;
      }

      blocks[id].ce = callExpressionsCount;
      return callExpressionsCount;
    case 'ExpressionStatement':
      return traverse(node.expression, node, blocks);
    case 'CallExpression':
      return 1;
    default:
      return 0;
  }
}

function getAST(fileName) {
  const content = fs.readFileSync(__dirname + fileName, 'utf8');
  const ast = babelParser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  return ast;
}

function extract(fileName) {
  const blocks = {};
  const ast = getAST(fileName);

  ast.program.body.forEach(node => {
    traverse(node, null, blocks);
  });

  return {
    file: fileName,
    blocks
  };
}

const fileName = '/example.js';
console.log('extract', JSON.stringify(extract(fileName)));
