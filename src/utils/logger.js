const chalk = require('chalk');

function logRoleOutput(role, model, input, output, cycle = 1) {
  const roleColor = {
    creator: chalk.magentaBright,
    engineer: chalk.cyanBright,
    critic: chalk.yellowBright
  };

  const label = roleColor[role] ? roleColor[role](role.toUpperCase()) : role.toUpperCase();

  console.log(`\n=== [Cycle ${cycle}] ${label} (${model}) ===`);
  console.log(chalk.gray('→ Input:\n'), input);
  console.log(chalk.green('→ Output:\n'), output);
}

function logError(tag, err) {
  console.error(chalk.red(`\n[ERROR][${tag}] →`), err.message || err);
}

module.exports = {
  logRoleOutput,
  logError
};
