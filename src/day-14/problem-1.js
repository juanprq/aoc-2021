const utils = require('../utils');


module.exports = () => {
  let [input, ...rules] = utils
    .loadInput(__dirname);

  rules = rules
    .map(rule => rule.split(' -> '))
    .reduce((accum, [pair, center]) => ({ ...accum, [pair]: center }), {});

  const space = [...new Set([...Object.values(rules)])];
  const initialCount = space
    .reduce((accum, key) => ({ ...accum, [key]: [0] }), {});

  const cache = Object
    .keys(rules)
    .reduce((accum, key) => {
      return { ...accum, [key]: [] };
    }, {});

  const mergeResults = (resultA, resultB) => {
      const result = Object
        .keys(resultA)
        .reduce((accum, key) => {
          return { ...accum, [key]: Number(resultA[key]) + Number(resultB[key]) };
        }, { ...initialCount });

    return result;
  }

  const totalIterations = 40;

  // returns a count map of elements
  const subIterate = (a, b, middle, n) => {
    if (n === totalIterations + 1) return { ...initialCount };
    if (cache[a + b][n]) return cache[a + b][n];
    const keyA = a + middle;
    const keyB = middle + b;

    let count = { ...initialCount, [middle]: 1 };
    count = mergeResults(subIterate(a, middle, rules[keyA], n + 1), count);
    count = mergeResults(subIterate(middle, b, rules[keyB], n + 1), count);

    cache[a + b][n] = count;

    return count;
  }

  const iterate = (a, b) => {
    const key = a + b;
    const initial = [a, b].reduce((accum, key) => {
      accum[key]++;
      return accum;
    }, { ...initialCount });

    const result = subIterate(a, b, rules[key], 1);
    // return mergeResults(result, initial);
    return result;

    // const key = a + b;
    // if (cache[key][n]) return cache[a + b][n]
    // if (n === totalIterations) {
    //   return [a, b].reduce((accum, key) => {
    //     accum[key]++;
    //     return accum;
    //   }, { ...initialCount });
    // }

    // const middle = rules[key];

    // const leftResult = iterate(a, middle, n + 1);
    // const rightResult = iterate(b, middle, n + 1);
    // let result = mergeResults(leftResult, rightResult);
    // result = mergeResults()

    // cache[key][n] = result;
    // return result;
  }

  // const iterations = 10;

  let results = input
    .split('')
    .reduce((accum, key) => {
      accum[key]++;
      return accum;
    }, { ...initialCount });
  for (let j = 0; j < input.length - 1; j++) {
    const a = input[j];
    const b = input[j + 1];

    results = mergeResults(results, iterate(a, b));
  }

  console.log(results);

  results = Object
    .values(results)
    .sort((a, b) => a - b);
  const result = results[results.length - 1] - results[0];
  console.log(results);

  return result;

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

module.exports.expectedValue =  2188189693529;
