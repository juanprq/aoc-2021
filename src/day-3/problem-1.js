const utils = require('../utils');

module.exports = () => {
  const parseInput = (row) => {
    const stringValues = row.split('');
    return stringValues.map(sValue => parseInt(sValue, 10));
  };

  const initializeArray = (n, defaultValue) => {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(defaultValue);
    }

    return result;
  };

  const data = utils
    .loadInput(__dirname)
    .map(parseInput);

  const rates = data.reduce((accum, row) => {
    const result = [...accum];
    for (let i = 0; i < result.length; i++) {
      result[i] += row[i];
    }

    return result;
  }, initializeArray(data[0].length, 0));

  const gammaRate = rates.map(bit => {
    return bit > data.length / 2 ? 1 : 0;
  });
  const epsilonRate = rates.map(bit => {
    return bit > data.length / 2 ? 0 : 1;
  });

  const gamma = parseInt(gammaRate.join(''), 2);
  const epsilon = parseInt(epsilonRate.join(''), 2);

  return gamma * epsilon;
};

module.exports.expectedValue = 198;
