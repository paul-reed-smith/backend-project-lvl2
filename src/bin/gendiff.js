#!/usr/bin/env node
import program from 'commander';
import func from '../index';
import { version } from '../../package.json';

program
  .version(version)
  .description('Calculates differences between two files')
  .arguments('<<firstConfig> <secondConfig>')
  .option('-V, --version        output the version number')
  .option('-h, --help           output usage information')
  .option('-f, --format [type]  Output format')
  .action((firstConfig, secondConfig) => console.log(func(firstConfig, secondConfig)))
  .parse(process.argv);
