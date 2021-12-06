const utils = require('../utils');


module.exports = () => {
  let [data] = utils
    .loadInput(__dirname)
    .map((row) => row.split(',').map(v => parseInt(v, 10)));

  for (let i = 0; i < 80; i++) {
    data = data.map(v => v - 1);

    const newLanterns = data.filter(v => v === -1);
    data = [...data, ...newLanterns.map(() => 8)];
    data = data.map(v => (v === -1 ? 6 : v));
  };

  return data.length;
};

module.exports.expectedValue = 5934;
