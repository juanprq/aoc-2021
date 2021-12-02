const utils = require('../utils');

module.exports = () => {
  const data = utils
    .loadInput(__dirname)
    .map(v => parseInt(v, 10));

  const windowSize = 3;
  let accum = 0;
  for (let i = 0; i < windowSize; i++) {
    accum += data[i];
  }

  let count = 0;
  for (let i = windowSize; i < data.length; i++) {
    const newValue = accum - data[i - windowSize] + data[i];
    if (newValue > accum) count++;
    accum = newValue;
  }

  return count;
};

module.exports.expectedValue = 5;
