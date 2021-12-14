const utils = require('../utils');

const mergeResults = (resultA, resultB) => {
    const result = Object
      .keys(resultA)
      .reduce((accum, key) => {
        return { ...accum, [key]: (resultA[key] || 0) + (resultB[key] || 0) };
      }, {});

  return result;
}

module.exports = () => {
  let [input, ...rules] = utils
    .loadInput(__dirname);

  rules = rules
    .map(rule => rule.split(' -> '))
    .reduce((accum, [pair, center]) => ({ ...accum, [pair]: center }), {});

  const cache = Object
    .keys(rules)
    .reduce((accum, key) => {
      return { ...accum, [key]: [] };
    }, {});

  // returns a count map of elements
  const iterate = (a, b, n) => {
    const key = a + b;
    if (cache[key][n]) return cache[a + b][n]
    if (n === 0) {
      return { [a]: 1, [b]: 1 };
    }

    const middle = rules[key];
    const leftResult = iterate(a, middle, n - 1);
    const rightResult = iterate(b, middle, n - 1);
    const result = mergeResults(leftResult, rightResult);

    cache[key][n] = result;
    return result;
  }

  const iterations = 10;

  let results = {};
  for (let j = 0; j < input.length - 1; j++) {
    const a = input[j];
    const b = input[j + 1];

    results = mergeResults(results, iterate(a, b, iterations));
  }

  console.log(results);

  return 0;

  // for (let i = 0; i < iterations; i++) {

  //   // let accum = '';
  //   for (let j = 0; j < input.length - 1; j++) {
  //     const a = input[j];
  //     const b = input[j + 1];
  //     const middle = rules[a + b];

  //     accum += a + middle;
  //     if (j === input.length - 2) {
  //       accum += b;
  //     }
  //   }

  //   input = accum;
  // }

  // const count = input
  //   .split('')
  //   .reduce((accum, letter) => {
  //     if (!accum[letter]) accum[letter] = 0;
  //     accum[letter]++;
  //     return accum;
  //   }, {});
  // const results = Object
  //   .values(count)
  //   .sort((a, b) => a - b);

  // return results[results.length - 1] - results[0];
};

module.exports.expectedValue = 1588;
