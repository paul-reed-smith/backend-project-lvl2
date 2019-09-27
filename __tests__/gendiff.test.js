import fs from 'fs';
import gendiff from '../src';

describe('Test', () => {
  test('gendiff', () => {
    const before = `${__dirname}/__fixtures__/before.json`;
    const after = `${__dirname}/__fixtures__/after.json`;
    const expected = String(fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`));
    const generated = gendiff(before, after);

    expect(expected).toEqual(generated);
  });
});
