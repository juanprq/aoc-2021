const utils = require('../utils');

module.exports = () => {
  console.time('all');
  let input = utils
    .loadInput(__dirname)
    .map(row => row.split('').map(Number));

  const sRows = input.length
  const sCols = input[0].length

  const rows = sRows * 5;
  const cols = sCols * 5;

  const totalMatrix = utils.initialize2DMatrix(rows, cols, 0);

  const getCost = (value) => {
    if (value + 1 <= 9) return value + 1;
    return (value + 1) % 9;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i < sRows && j < sCols) {
        totalMatrix[i][j] = input[i][j];
      } else if (i >= sRows && j < sCols) {
        totalMatrix[i][j] = getCost(totalMatrix[i - sRows][j]);
      }  else if (j >= sCols) {
        totalMatrix[i][j] = getCost(totalMatrix[i][j - sCols]);
      }
    }
  }

  input = totalMatrix;
  // utils.print2DMatrix(input);

  // what if I build an adjacency list
  const adjacencyList = [];
  const nodes = utils.initialize2DMatrix(rows, cols);
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      nodes[i][j] = (i * cols) + j;
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const adjacentNodes = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ].filter(([r, c]) => {
        return (r >= 0 && r < rows) && (c >= 0 && c < cols);
      })
        .map(([r, c]) => {
          const node = nodes[r][c];
          const cost = input[r][c];

          return [node, cost];
        });


      const node = nodes[i][j];

      adjacencyList[node] = adjacentNodes;
    }
  }

  // how to traverse that adjacency list to get the minimum cost?
  const visited = [0];
  let unVisited = [];
  for (let i = 1; i < adjacencyList.length; i++) {
    unVisited.push(i);
  }
  const costs = new Array(adjacencyList.length).fill(Infinity);
  costs[0] = 0;

  const adjacentNodes = adjacencyList[0];
  adjacentNodes.forEach(([node, cost]) => {
    if (costs[node] > cost) costs[node] = cost;
  });

  let iterations = 0;
  console.log(rows * cols);
  while(unVisited.length) {
    console.time('iteration');
    console.log(`----> iteration: ${iterations + 1}`);
    // get the lowest cost on unVisitedNodes
    console.time('reduce');
    let visitedIndex = new Array(visited.length).fill(false);
    visitedIndex = visited.reduce((accum, node) => {
      accum[node] = true;
      return accum;
    }, visitedIndex);
    console.timeEnd('reduce');

    console.time('filter');
    const nextSpace = unVisited
      .filter(node => !visitedIndex[node]);
    console.timeEnd('filter');

    if (nextSpace.length === 0) break

    console.time('nextNode');
    let [nextNode] = nextSpace;
    nextSpace.forEach(cNode => {
      if (costs[cNode] < costs[nextNode]) nextNode = cNode;
    });
    console.timeEnd('nextNode');

    const adjacentNodes = adjacencyList[nextNode];
    if (!adjacentNodes) break;

    console.time('adjacent');
    adjacentNodes.forEach(([node, cost]) => {
      const newCost = costs[nextNode] + cost;
      if (costs[node] > newCost) costs[node] = newCost;
    });
    console.timeEnd('adjacent');

    console.time('push');
    visited.push(nextNode);
    console.timeEnd('push');

    console.time('filter');
    unVisited.filter(a => a !== nextNode);
    console.timeEnd('filter');

    iterations++;

    console.timeEnd('iteration');

    // if (iterations % 1 === 0) {
    //   process.stdout.clearLine();
    //   process.stdout.cursorTo(0);
    //   const percentage = Math.floor(costs.filter(a => a !== Infinity).length / costs.length * 100);
    //   process.stdout.write(percentage.toString() + '%');
    // }
  }
  console.log();

  console.timeEnd('all');
  return costs[costs.length - 1];
};

module.exports.expectedValue = 315;
