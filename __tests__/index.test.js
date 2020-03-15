import fs from 'fs';
import path from 'path';
import calculateTheDifferences from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const inputFormats = ['json', 'ini', 'yaml'];
const outputFormats = ['pretty', 'plain', 'json'];

describe.each(inputFormats)('Input format: %s', (inputFormat) => {
  it.each(outputFormats)('Output format: %s', (outputFormat) => {
    const first = getPath(`first.${inputFormat}`);
    const second = getPath(`second.${inputFormat}`);
    const expected = fs.readFileSync(getPath(`${outputFormat}Expected.txt`), 'utf-8');
    const generated = calculateTheDifferences(first, second, outputFormat);

    expect(expected).toEqual(generated);
  });
});
