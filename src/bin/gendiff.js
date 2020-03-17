#!/usr/bin/env node
import program from 'commander';
import calculateTheDifferences from '../index';
import { version } from '../../package.json';

program
  .version(version)
  .description('Calculates differences between two files')
  .arguments('<<firstConfig> <secondConfig>')
  .option('-V, --version        output the version number')
  .option('-f, --format [type]  Output format')
  .option('-h, --help           output usage information')
  .action((firstConfig, secondConfig) => {
    console.log(calculateTheDifferences(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
