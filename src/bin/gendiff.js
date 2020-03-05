#!/usr/bin/env node
import program from 'commander';
import func from '../index';
import { version } from '../../package.json';

program
  .version(version)
  .description('Calculates differences between two files')
  .arguments('<<firstConfig> <secondConfig>')
  .option('-V, --version        output the version number')
  .option('-f, --format [type]  Output format')
  .action((firstConfig, secondConfig) => {
    console.log(func(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
