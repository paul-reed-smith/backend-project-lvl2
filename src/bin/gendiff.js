#!/usr/bin/env node
import program from 'commander';
import func from '../index';
import { version } from '../../package.json';

program
  .version(version)
  .description('Calculates differences between two files');

func();
