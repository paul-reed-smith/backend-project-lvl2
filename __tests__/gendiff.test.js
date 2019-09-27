import fs from 'fs';
import gendiff from '../src';


test('gendiff', () => {
  const before = `${__dirname}/__fixtures__/before.json`;
  const after = `${__dirname}/__fixtures__/after.json`;
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/expexted.txt`);
  const generated = gendiff(before, after);

  expect(expected).toEqual(generated);
});
