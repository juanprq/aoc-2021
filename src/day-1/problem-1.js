const utils = require('../utils');

const data = utils
  .loadInput(__dirname)
  .map(v => parseInt(v, 10));

let count = 0;
for (let i = 1; i < data.length; i++) {
  if (data[i] > data[i - 1]) count++;
}

console.log('---> result');
console.log(count);
