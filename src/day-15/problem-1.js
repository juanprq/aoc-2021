const utils = require('../utils');

module.exports = () => {
  const input = utils
    .loadInput(__dirname)
    .map(row => row.split('').map(Number));

  const rows = input.length;
  const cols = input[0].length;

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

  while(unVisited.length) {
    // get the lowest cost on unVisitedNodes
    const [nextNode] = unVisited
      .filter(node => !visited.includes(node))
      .sort((a, b) => costs[a] - costs[b]);

    const adjacentNodes = adjacencyList[nextNode];
    if (!adjacentNodes) break;

    adjacentNodes.forEach(([node, cost]) => {
      const newCost = costs[nextNode] + cost;
      if (costs[node] > newCost) costs[node] = newCost;
    });
    visited.push(nextNode);
    unVisited.filter(a => a !== nextNode);

    console.log(costs.filter(a => a !== Infinity).length);
  }

  return costs[costs.length - 1];
};

module.exports.expectedValue = 40;
