const utils = require('../utils');

const numbers = [
  '1, 2, 3, 5, 6, 7',
  '3, 6',
  '1, 3, 4, 5, 7',
  '1, 3, 4, 6, 7',
  '2, 3, 4, 6',
  '1, 2, 4, 6, 7',
  '1, 2, 4, 5, 6, 7',
  '1, 3, 6',
  '1, 2, 3, 4, 5, 6, 7',
  '1, 2, 3, 4, 6, 7',
];

const getDifference = (a, b) => {
  const result = new Set();
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      result.add(a[i]);
    }
  }

  return [...result];
};

const getCount = (signals) => {
  return signals
    .join('')
    .split('')
    .reduce((accum, s) => {
      if (!accum[s]) accum[s] = 0;

      accum[s]++;
      return accum;
    }, {});
}

const findElementForCount = (accum, count, exlude = []) => {
  console.log('-->');
  console.log(exlude);
  console.log(
    Object
      .entries(accum)
      .filter(([key]) => !exlude.includes(key))
      .filter(([key, currentCount]) => currentCount === count)
  );

  return Object
    .entries(accum)
    .filter(([key]) => !exlude.includes(key))
    .filter(([key, currentCount]) => currentCount === count)
    .map(([key]) => key)[0];
};

module.exports = () => {
  let data = utils
    .loadInput(__dirname)
    .map(row => {
      const [head, tail] = row.split(' | ');

      return [head.split(' '), tail.split(' ')];
    });

  const results = [];
  for (let i = 0; i < data.length; i++) {
    const [head, tail] = data[i];

    // find the 1, 4, 7 and 8
    const indexOf1 = head.findIndex(signal => signal.length === 2);
    const indexOf4 = head.findIndex(signal => signal.length === 4);
    const indexOf7 = head.findIndex(signal => signal.length === 3);

    const mapping = {};
    const count = getCount(head);

    // to find the position 1, I should have difference between 7 and 1
    const [signalFor1] = getDifference(head[indexOf7], head[indexOf1]);
    mapping[1] = signalFor1;

    // to find the position of 6, only one element should have a 9
    mapping[6] = findElementForCount(count, 9);

    // to find the position of 3, only one element should have a 8 other tan the first one
    mapping[3] = findElementForCount(count, 8, Object.values(mapping));

    // to find the position 5, it only appears 4 times
    mapping[5] = findElementForCount(count, 4, Object.values(mapping));

    // to find the position 2, it only appears 6 times
    mapping[2] = findElementForCount(count, 6, Object.values(mapping));

    // to find the position 4, is the element of 4 and the difference of what I have
    mapping[4] = getDifference(head[indexOf4], Object.values(mapping).join(''))[0];

    // the 7 is the other one of count 7 not present
    mapping[7] = findElementForCount(count, 7, Object.values(mapping));

    const inverseMapping = Object
      .entries(mapping)
      .reduce((accum, [key, value]) => {
        return { ...accum, [value]: parseInt(key, 10) }
      }, {});

    console.log(mapping);
    console.log(inverseMapping);

    // now I should convert every letter with the mapping...
    const conversion = tail
      .map(signal => {
        const signalPositionMapping = signal
          .split('')
          .map(letter => inverseMapping[letter])
          .sort();

        return numbers.findIndex(v => v === signalPositionMapping.join(', '))
      });

    results.push(parseInt(conversion.join(''), 10));
  }

  return results.reduce((a, b) => a + b);
};

module.exports.expectedValue = 61229;
