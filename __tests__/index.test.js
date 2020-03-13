import fs from 'fs';
import path from 'path';
import calculateTheDifferences from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const types = [
  ['json', 'pretty'],
  ['ini', 'pretty'],
  ['yaml', 'pretty'],
  ['json', 'plain'],
  ['ini', 'plain'],
  ['yaml', 'plain'],
  ['json', 'json'],
  ['ini', 'json'],
  ['yaml', 'json'],
];

test.each(types)('Input format: %s, output format: %s', (inputFormat, outputFormat) => {
  const first = getPath(`first.${inputFormat}`);
  const second = getPath(`second.${inputFormat}`);
  const expected = fs.readFileSync(getPath(`${outputFormat}Expected.txt`), 'utf-8');
  const generated = calculateTheDifferences(first, second, outputFormat);

  expect(expected).toEqual(generated);
});
