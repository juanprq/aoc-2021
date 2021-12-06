const utils = require('../utils');

module.exports = () => {
  let [data] = utils
    .loadInput(__dirname)
    .map((row) => row.split(',').map(v => parseInt(v, 10)));

  const days = 256;
  const count = data
    .reduce((accum, value) => {
      accum[value]++;
      return accum;
    }, new Array(9).fill(0));

  console.log('I\t -> 1 2 3 4 5 6 7 8');
  for (let i = 0; i < days; i++) {
    const [first] = count;

    // slide the array to the left
    for (let i = 0; i < count.length - 1; i++) {
      count[i] = count[i + 1];
    }

    // position 6
    count[6] += first;
    // position 8
    count[8] = first;

    process.stdout.write(`${i + 1}\t -> `);
    for (let i = 0; i < count.length; i++) {
      process.stdout.write(count[i].toString());
      process.stdout.write(' ');
    }
    process.stdout.write('\n');
  };

  return count.reduce((a, b) => a + b);
};

module.exports.expectedValue = 26984457539;
