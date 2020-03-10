import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

// const outputFormats = ['pretty', 'plain', 'json'];

test.each(['json', 'yaml', 'ini'])('Input format: %s, output is: pretty', (format) => {
  const first = getPath(`first.${format}`);
  const second = getPath(`second.${format}`);
  const expected = fs.readFileSync(getPath('expectedPretty.txt'), 'utf-8');
  const generated = gendiff(first, second);

  expect(expected).toEqual(generated);
});


test('plain format', () => {
  const first = getPath('first.json');
  const second = getPath('second.json');
  const expected = fs.readFileSync(getPath('expectedPlain.txt'), 'utf-8');
  const generated = gendiff(first, second, 'plain');

  expect(expected).toEqual(generated);
});

test('json format', () => {
  const first = getPath('first.json');
  const second = getPath('second.json');
  const expected = fs.readFileSync(getPath('expectedJSON.txt'), 'utf-8');
  const generated = gendiff(first, second, 'json');

  expect(expected).toEqual(generated);
});
