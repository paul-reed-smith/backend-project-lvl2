import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

test.each(['json', 'yaml', 'ini'])('Input format: %s, output is: pretty', (format) => {
  const first = getPath(`first.${format}`);
  const second = getPath(`second.${format}`);
  const expected = fs.readFileSync(getPath('prettyExpected.txt'), 'utf-8');
  const generated = gendiff(first, second);

  expect(expected).toEqual(generated);
});

test.each(['plain', 'json'])('Input format: json, output is: %s', (format) => {
  const first = getPath('first.json');
  const second = getPath('second.json');
  const expected = fs.readFileSync(getPath(`${format}Expected.txt`), 'utf-8');
  const generated = gendiff(first, second, format);

  expect(expected).toEqual(generated);
});
