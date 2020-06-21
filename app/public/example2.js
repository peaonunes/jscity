function sum(a, b) {
  return a + b;
}

function calculate(a, b) {
  function log(text) {
    console.log(text);
  }
  log(sum(a, b));
  log(minus(a, b));
  log(times(a, b));
}

function minus(a, b) {
  return a - b;
}

function times(a, b) {
  return a * b;
}
