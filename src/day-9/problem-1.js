const utils = require('../utils');

module.exports = () => {
  let data = utils
    .loadInput(__dirname)
    .map(row => {
      return row
        .split('')
        .map(v => parseInt(v, 10));
    });

  const lowestPoints = [];
  const rows = data.length;
  const cols = data[0].length;

  const getAdjacentPoints = (i, j) => {
    const adjacentPoints = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ];

    return adjacentPoints;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentPoint = data[i][j];

      const adjacentPoints = getAdjacentPoints(i, j)
        .map(([r, c]) => data[r] && data[r][c])
        .filter(a => a !== undefined);

      if (adjacentPoints.every(ap => ap > currentPoint)) {
        lowestPoints.push(currentPoint);
      }
    }
  }

  return lowestPoints
    .map(p => p + 1)
    .reduce((a, b) => a + b);
};

module.exports.expectedValue = 15;
