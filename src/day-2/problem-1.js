const utils = require('../utils');

const parseValue = (value) => {
  const [instruction, units] = value.split(' ');

  return [instruction, parseInt(units, 10)];
};

const data = utils
  .loadInput(__dirname)
  .map(parseValue)

let horizontal = 0;
let depth = 0;

for(let i = 0; i < data.length; i++) {
  const [instruction, units] = data[i];

  switch (instruction) {
    case 'forward':
      horizontal += units;
      break;
    case 'down':
      depth += units;
      break;
    default:
      depth -= units;
  }
}

console.log('---> result');
console.log(horizontal * depth);
