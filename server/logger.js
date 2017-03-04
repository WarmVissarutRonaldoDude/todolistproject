const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware
 */
const logger = {
  // called whenever there's an error on the server we want to print
  error: (err) => {
    console.log(chalk.red(err));
  },

  // called when express app starts on given port
  appStarted: (port, tunnelStarted) => {
    console.log(`Server started ${chalk.green('✓')}`);

    if (tunnelStarted) {
      console.log(`Tunnel initialized ${chalk.green('✓')}`);
    }

    console.log(
      `${chalk.bold('\nAccess URLs:') +
      divider
      }\nLocalhost: ${chalk.magenta(`http://localhost:${port}`)
      }\n      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)
      }${tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : ''
      }${divider}`,
      chalk.blue(`\nPress ${chalk.italic('CTRL-C')} to stop\n`)
    );
  },
};

module.exports = logger;
