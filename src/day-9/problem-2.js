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
        lowestPoints.push([i, j]);
      }
    }
  }

  const trackers = utils.initialize2DMatrix(rows, cols, 0);
  const findInsideBasin = (r, c, prev, index) => {
    if (r < 0 || c < 0) return;
    if (r >= rows || c >= cols) return;
    if (trackers[r][c] !== 0) return;
    if (data[r][c] === 9) return;
    // TODO: it could be with or without equal
    if (data[r][c] <= prev ) return;

    trackers[r][c] = index;
    findInsideBasin(r - 1, c, data[r][c], index);
    findInsideBasin(r + 1, c, data[r][c], index);
    findInsideBasin(r, c - 1, data[r][c], index);
    findInsideBasin(r, c + 1, data[r][c], index);
  }
  const findBasin = (r, c, index) => {
    trackers[r][c] = index;

    findInsideBasin(r - 1, c, data[r][c], index);
    findInsideBasin(r + 1, c, data[r][c], index);
    findInsideBasin(r, c - 1, data[r][c], index);
    findInsideBasin(r, c + 1, data[r][c], index);
  };

  for (let i = 0; i < lowestPoints.length; i ++) {
    const [r, c] = lowestPoints[i];

    findBasin(r, c, i + 1);
  }

  const result = {}
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const currentBasin = trackers[r][c];
      if (currentBasin === 0) continue;
      if (!result[currentBasin]) result[currentBasin] = 0;
      result[currentBasin]++;
    }
  }

  return Object
    .values(result)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
};

module.exports.expectedValue = 1134;
