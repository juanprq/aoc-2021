const utils = require('../utils');

module.exports = () => {
  const parseValue = (value) => {
    const [instruction, units] = value.split(' ');

    return [instruction, parseInt(units, 10)];
  };

  const data = utils
    .loadInput(__dirname)
    .map(parseValue)

  let aim = 0;
  let horizontal = 0;
  let depth = 0;

  for(let i = 0; i < data.length; i++) {
    const [instruction, units] = data[i];

    switch (instruction) {
      case 'forward':
        horizontal += units;
        depth += units * aim;
        break;
      case 'down':
        aim += units;
        break;
      default:
        aim -= units;
    }
  }

  return horizontal * depth;
};

module.exports.expectedValue = 900;
