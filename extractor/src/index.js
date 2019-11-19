const babelParser = require("@babel/parser");
const fs = require("fs");
const BLOCKS = {};

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

let counter = 0;
function getPosition() {
  counter += 100;
  return [counter, 1, 1];
}

function traverse(node, parent) {
  switch (node.type) {
    case "FunctionDeclaration":
      const id = getId(node);
      const loc = countLoc(node);
      BLOCKS[id] = {
        id,
        loc,
        children: [],
        position: getPosition()
      };
      // node.body type: "BlockStatement" therefore we should look for body of the block
      const callExpressionsCount = node.body.body.reduce((acc, child) => {
        return acc + traverse(child, node);
      }, 0);
      if (parent) {
        BLOCKS[getId(parent)].children.push(id);
      }
      BLOCKS[id].ce = callExpressionsCount;
      return callExpressionsCount;
    case "ExpressionStatement":
      return traverse(node.expression, node);
    case "CallExpression":
      return 1;
    default:
      return 0;
  }
}

const content = fs.readFileSync(__dirname + "/example.js", "utf8");
const ast = babelParser.parse(content, {
  sourceType: "module",
  plugins: ["jsx"]
});

ast.program.body.forEach(node => {
  traverse(node);
});

console.log("BLOCKS", BLOCKS);
