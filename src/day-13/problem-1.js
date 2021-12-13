const utils = require('../utils');

module.exports = () => {
  let input = utils
    .loadInput(__dirname);

  const points = [];
  const folds = [];

  let rows = 0;
  let cols = 0;
  input.forEach((row) => {
    if (row.includes(',')) {
      const point = row
        .split(',')
        .map(v => parseInt(v, 10));

      if (point[1] > rows) rows = point[1];
      if (point[0] > cols) cols = point[0];

      points.push(point.reverse());
    } else {
      const fold = row.split(' ')[2];
      const [axis, sValue] = fold.split('=');

      folds.push([axis, parseInt(sValue, 10)]);
    }
  });
  rows++;
  cols++;

  let matrix = utils.initialize2DMatrix(rows, cols, '.');
  points.forEach(([r, c]) => {
    matrix[r][c] = '#';
  });

  folds.slice(0, 1).forEach(([axis, value]) => {
    let newRows = rows;
    let newCols = cols;
    if (axis === 'x') {
      newCols = value;
    } else {
      newRows = value;
    }

    const foldedMatrix = utils.initialize2DMatrix(newRows, newCols, '.');

    if (axis === 'x') {
      for (let i = 0; i < newRows; i++) {
        matrix[i][value] = '|';
      }
    } else {
      for (let i = 0; i < newCols; i++) {
        matrix[value][i] = '-';
      }
    }

    // copying the first part
    for (let r = 0; r < newRows; r++) {
      for (let c = 0; c < newCols; c++) {
        foldedMatrix[r][c] = matrix[r][c];
      }
    }

    if (axis === 'y') {
      for (let r = value + 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const destinationRow = 2 * value - r;

          if (matrix[r][c] === '#' && destinationRow >= 0) {
            foldedMatrix[destinationRow][c] = '#';
          }
        }
      }
    } else {
      for (let r = 0; r < rows; r++) {
        for (let c = value + 1; c < cols; c++) {
          const destinationCol = 2 * value - c;

          if (matrix[r][c] === '#' && destinationCol >= 0)  {
            foldedMatrix[r][destinationCol] = '#';
          }
        }
      }
    }

    matrix = foldedMatrix;
    rows = newRows;
    cols = newCols;
  });

  let count = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === '#') count++;
    }
  }

  return count;
};

module.exports.expectedValue = 17;
