import fs from 'fs';
import gendiff from '../src';

test.each(['json', 'yml', 'ini'])('Input format: %s ,output is: pretty', (format) => {
  const first = `${__dirname}/__fixtures__/first.${format}`;
  const second = `${__dirname}/__fixtures__/second.${format}`;
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/expectedPretty.txt`);
  const generated = gendiff(first, second);

  expect(expected).toEqual(generated);
});

test('plain format', () => {
  const first = `${__dirname}/__fixtures__/first.json`;
  const second = `${__dirname}/__fixtures__/second.json`;
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/expectedPlain.txt`);
  const generated = gendiff(first, second);

  expect(expected).toEqual(generated);
});
