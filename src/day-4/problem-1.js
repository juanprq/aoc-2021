const utils = require('../utils');

const checkWinner = (tracker) => {
  let rows = tracker.map(row => row.every(a => a));
  if (rows.some(a => a)) return true;

  // check cols
  for (let i = 0; i < tracker.length; i++) {
    let winner = true;
    for (let j = 0; j < tracker[0].length; j++) {
      winner = winner && tracker[j][i];
    }

    if (winner) return true;
  }

  return false;
}

module.exports = () => {
  const data = utils
    .loadInput(__dirname);

  // load the initial data
  const draftNumbers = data
    .shift()
    .split(',')
    .map(value => parseInt(value, 10));

  let boards = [];
  let currentBoard = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== '\n') {
      const row = data[i]
        .trim()
        .split(/\s+/)
        .map(value => parseInt(value, 10));


      currentBoard.push(row);

      if (currentBoard.length === 5) {
        boards.push(currentBoard);
        currentBoard = [];
      }
    }
  }

  const trackers = [];
  boards.forEach(() => {
    trackers.push(utils.initialize2DMatrix(5, 5, false));
  });

  let winnerIndex;
  let lastDraft;

  for (let i = 0; i < draftNumbers.length; i++) {
    const draftNumber = draftNumbers[i];

    for (let j = 0; j < boards.length; j++) {
      const currentBoard = boards[j];

      for (let c = 0; c < currentBoard.length; c++) {
        for (let r = 0; r < currentBoard[0].length; r++) {
          if (currentBoard[c][r] === draftNumber) {
            trackers[j][c][r] = true;
          }
        }
      }

      // check if current board is winner
      const winner = checkWinner(trackers[j]);

      if (winner) {
        lastDraft = draftNumber;
        winnerIndex = j;
      }
    }

    if (winnerIndex) break;
  }

  const winnerTracker = trackers[winnerIndex];
  const winnerBoard = boards[winnerIndex];

  let sum = 0;
  for (let i = 0; i < winnerBoard.length; i++) {
    for (let j = 0; j < winnerBoard[0].length; j++) {
      if (!winnerTracker[i][j]) {
        sum += winnerBoard[i][j];
      }
    }
  }

  return lastDraft * sum;
};

module.exports.expectedValue = 4512;
