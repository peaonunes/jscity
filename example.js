function sum(a, b) {
  return a + b;
}

function sum10(a) {
  return sum(1, b);
}

function logSums(a, b) {
  console.log('sum a + b', sum(a, b));
  console.log('sum 10 with a', sum10(a));
  console.log('sum 10 with B', sum10(b));
}

logSums();
