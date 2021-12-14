const buffer = require('buffer');
const utils = require('../utils');

const mapping = {
  B: 0,
  N: 1,
  C: 2,
  H: 3,
};

// const printCount = (result) => {
//   for (let i = 0; i < result.length; i++) {
//     process.stdout.write(result[i] + '\t');
//   }
//   console.log();
// };

module.exports = () => {
  let [input, ...rules] = utils
    .loadInput(__dirname);

  rules = rules
    .map(rule => rule.split(' -> '))
    .reduce((accum, [pair, center]) => ({ ...accum, [pair]: center }), {});

  let data = Buffer.alloc(buffer.constants.MAX_LENGTH);
  let currentLength = input.length;
  for (let i = 0; i < input.length; i++) {
    data[i] = input[i].charCodeAt();
  }

  const iterations = 40;
  const counts = [];
  for (let i = 0; i < iterations; i++) {

    let accum = Buffer.alloc(buffer.constants.MAX_LENGTH);
    let writeIndex = 0;
    for (let j = 0; j < currentLength - 1; j++) {
      const a = String.fromCharCode(data[j]);
      const b = String.fromCharCode(data[j + 1]);
      const middle = rules[a + b];

      accum[writeIndex] = data[j];
      writeIndex++;
      accum[writeIndex] = middle.charCodeAt();
      writeIndex++;

      if (j === currentLength - 2) {
        accum[writeIndex] = data[j + 1];
        writeIndex++;
      }
    }

    console.log(`iteration: ${i + 1}`);
    // console.log(accum.toString('utf8', 0, writeIndex));

    data = accum;
    currentLength = writeIndex;

    // input = accum;

    // const count = input
    //   .split('')
    //   .reduce((accum, letter) => {
    //     if (!accum[letter]) accum[letter] = 0;
    //     accum[letter]++;
    //     return accum;
    //   }, {});
    // const result = Object
    //   .entries(count)
    //   .reduce((accum, [key, value]) => {
    //     accum[mapping[key]] = value;
    //     return accum;
    //   }, []);

    // counts.push(result);
    // console.log(result);
  }

  // const keys = Object.keys(mapping);
  // for (let i = 0; i < keys.length; i++) {
  //   process.stdout.write(keys[i] + '\t');
  // }
  // console.log();
  // for (let i = 0; i < counts.length; i++) {
  //   const [b, n, c, h] = counts[i];
  //   const total = b + n + c + h
  //   process.stdout.write(`${b + h / total}` + '\t');
  //   process.stdout.write(`${n + c / total}` + '\t');
  //   console.log();
  // }

  // const results = Object
  //   .values(count)
  //   .sort((a, b) => a - b);

  // console.log(count);

  return 0;
};

module.exports.expectedValue = 2188189693529;
