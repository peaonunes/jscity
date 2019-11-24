function oneLineFunction() {
  function oneLineFunction() {
    function oneLineFunction() {}
    function oneLineFunction() {}
    function oneLineFunction() {}
    arrowFunction();
    arrowFunction();
    arrowFunction();
    return 2;
  }
  oneLineFunction();
  oneLineFunction();
  return 1;
}

function sample() {
  function oneLineFunction() {
    arrowFunction();
    return 2;
  }
  oneLineFunction();
  return 1;
}

// limitation
const arrowFunction = () => {
  let i = oneLineFunction();
  return i;
};

let x = 1;

(function callExpression() {
  console.log('oxe');
})();

const object = {
  keyFunc: function() {
    return 1;
  }
};
