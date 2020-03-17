#!/usr/bin/env node
import program from 'commander';
import calculateTheDifferences from '../index';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'Output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(calculateTheDifferences(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
