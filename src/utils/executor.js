const path = require('path');
const flags = require('flags');
const chalk = require('chalk');
const childProcess = require('child_process');

flags.defineNumber('d');
flags.defineNumber('p');
flags.defineBoolean('t', false);

flags.parse();

const day = flags.get('d');
const problem = flags.get('p');
const testMode = flags.get('t');

if (!day) {
  throw new Error('day flag is not present, please add a --d x to indicate the day to execute');
}

if (!problem) {
  throw new Error('problem flag is not present, please add a --p x to indicate the problem to execute');
}

const filePath = path.join(process.cwd(), `/src/day-${day}/problem-${problem}.js`);

import(filePath)
  .then(module => {
    // TODO: Print something pretty
    console.log(`DAY ${day}`);
    console.log(`PROBLEM ${problem}`);

    const result = module.default();

    if (testMode) {
      if (result === module.expectedValue) {
        console.log(chalk.green('Bingo! we hit the motherload!'));
      } else {
        console.log(chalk.red('Try again! bad result...'));
      }
    }

    childProcess.exec(`echo "${result}" | pbcopy`);

    console.log('--- RESULT ---');
    console.log(result)
    console.log(chalk.green('result copyed to clipboard'));
  });
