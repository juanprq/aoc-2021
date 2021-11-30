const fs = require('fs');
const path = require('path');

const loadInputString = (dirPath) => {
  const result = fs.readFileSync(path.join(dirPath, '/input.txt'), 'utf8');

  if (result.charCodeAt(result.length - 1) === 10) {
    return result.slice(0, result.length - 1);
  } else {
    return result;
  }
}

const loadInput = (dirPath, separator = '\n') => {
  const result = loadInputString(dirPath);
  return result.split(separator).filter(a => a.length > 0);
};

const print2DMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      process.stdout.write(matrix[i][j]);
    }

    process.stdout.write('\n');
  }
};

const print3DMatrix = (matrix, offset = 0) => {
  for (let i = 0; i < matrix.length; i++) {
    console.log(`----- z = ${i - offset}`);
    print2DMatrix(matrix[i]);
  }
};

const initialize2DMatrix = (rows, cols, initialValue = 0) => {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i]) {
        matrix[i][j] = initialValue;
      } else {
        matrix[i] = [initialValue];
      }
    }
  }

  return matrix;
};

const initialize3DMatrix = (depth, rows, cols, initialValue = 0) => {
  const matrix = [];
  for (let i = 0; i < depth; i++) {
    matrix[i] = initialize2DMatrix(rows, cols, initialValue);
  }

  return matrix;
};

const initialize4DMatrix = (hyper, depth, rows, cols, initialValue = 0) => {
  const matrix = [];
  for (let i = 0; i < hyper; i++) {
    matrix[i] = initialize3DMatrix(depth, rows, cols, initialValue);
  }

  return matrix;
}

const rotateLeft = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // interchange rows and cols
  const newMatrix = initialize2DMatrix(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      newMatrix[i][j] = matrix[j][cols - i - 1];
    }
  }

  return newMatrix;
}

const rotateNLeft = (matrix, n) => {
  let result = matrix;

  for (i = 0; i < n; i++) {
    result = rotateLeft(result);
  }

  return result;
}

module.exports = {
  loadInput,
  loadInputString,
  print2DMatrix,
  print3DMatrix,
  initialize2DMatrix,
  initialize3DMatrix,
  initialize4DMatrix,
  rotateLeft,
  rotateNLeft,
};
