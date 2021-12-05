const utils = require('../utils');

const parseInput = (row) => {
  const numbers = row.split(' -> ');
  return numbers.map((coordinate) => {
    return coordinate
      .split(',')
      .map(v => parseInt(v, 10));
  });
};

module.exports = () => {
  const data = utils
    .loadInput(__dirname)
    .map(parseInput);

  const n = Math.max(
    ...data
      .flatMap(a => a)
      .flatMap(a => a)
  ) + 1;

  const countTracker = utils.initialize2DMatrix(n, n, 0);

  for (let i = 0; i < data.length; i++) {
    const [[x1, y1], [x2, y2]] = data[i];

    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        if (x1 === x2 || y1 === y2) {
          countTracker[y][x] += 1;
        }
      }
    }
  }

  utils.print2DMatrix(countTracker);

  let count = 0;
  for (let y = 0; y < countTracker.length; y++) {
    for (let x = 0; x <= countTracker[0].length; x++) {
      if (countTracker[y][x] > 1) {
        count++;
      }
    }
  }

  return count;
};

module.exports.expectedValue = 5;
