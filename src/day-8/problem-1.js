const utils = require('../utils');

const uniqueDigits = [2, 4, 3, 7];

module.exports = () => {
  let data = utils
    .loadInput(__dirname)
    .map(row => {
      const [head, tail] = row.split(' | ');

      return head.split(' ');
    });

  // console.log(data);

  let count = 0;
  let something = [];
  for (let i = 0; i < data.length; i++) {
    // if (uniqueDigits.includes(data[i].length)) {
    //   count++;
    // }
    const counter = data[i]
      .map(signal => signal.length)
      .reduce((accum, length) => ({ ...accum, [length]: true }), {});

    if (counter[2] && counter[4] && counter[3] && counter[7]) {
      something.push(true);
    } else {
      something.push(false);
    }
  }

  console.log(something.every(v => v));

  return count;
};

module.exports.expectedValue = 26;
