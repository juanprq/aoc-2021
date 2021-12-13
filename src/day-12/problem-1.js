const utils = require('../utils');

const isSmallCave = (nodeName) => {
  return nodeName === nodeName.toLowerCase();
}

module.exports = () => {
  let data = utils
    .loadInput(__dirname)
    .map(row => row.split('-'));

  const graph = data.reduce((accum, [sNode, eNode]) => {
    if (!accum[sNode]) accum[sNode] = [];
    accum[sNode].push(eNode);

    if (!accum[eNode]) accum[eNode] = [];
    accum[eNode].push(sNode);

    return accum;
  }, {});

  let paths = 0;
  const navigate = (node = 'start', visited = []) => {
    if (visited.includes(node)) return;
    if (node === 'end') {
      paths++;
      return;
    }

    const newVisited = [...visited];
    if (isSmallCave(node)) newVisited.push(node);

    const adjacentNodes = graph[node];
    for (let i = 0; i < adjacentNodes.length; i++) {
      navigate(adjacentNodes[i], newVisited);
    }
  }

  navigate();

  return paths;
};

module.exports.expectedValue = 10;
