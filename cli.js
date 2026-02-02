#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
    .name('my-cli')
    .description('A CLI application built with Commander.js')
    .version('1.0.0')
    .option('-d, --debug', 'output extra debugging information')
    .option('-f, --file <path>', 'specify the file to process')
    .option('-t, --timeout <seconds>', 'specify the timeout in seconds', '60')
    .option('-v, --verbose', 'enable verbose output');
program.parse();

// Access the options
const options = program.opts();
if (options.debug) {
    console.log('Debug mode is enabled');
    console.log('Options:', options);
}

if (options.file) {
    console.log('File path:', options.file);
}

if (options.timeout) {
    console.log('Timeout:', options.timeout);
}

if (options.verbose) {
    console.log('Verbose mode is enabled');
}