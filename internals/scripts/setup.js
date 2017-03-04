#!/usr/bin/env node

'use strict';

const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
const fs   = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

var interval = null;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');

init();

function init() {
  process.stdout.write('\nInstalling dependencies... (This might take a while)');
  setTimeout(function () {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Installing dependencies... (This might take a while)');
  }, 500);

  installDeps();
}

/**
 * Installs dependencies
 */
function installDeps() {
  exec('node --version', function (err, stdout, stderr) {
    const nodeVersion = stdout && parseFloat(stdout.substring(1));
    if (nodeVersion < 5 || err) {
      installDepsCallback(err || 'Unsupported node.js version, make sure you have the latest version installed.');
    } else {
      exec('yarn --version', function (err, stdout, stderr) {
        if (parseFloat(stdout) < 0.15 || err || process.env.USE_YARN === 'false') {
          exec('npm install', addCheckMark.bind(null, installDepsCallback));
        } else {
          exec('yarn install', addCheckMark.bind(null, installDepsCallback));
        }
      });
    }
  });
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
  clearInterval(interval);
  process.stdout.write('\n');
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(1);
  }

  process.stdout.write('\nDone!\n');
  process.exit(0);
}
