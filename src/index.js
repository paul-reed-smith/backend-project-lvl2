import fs from 'fs';
import parse from './parsers';

const diff = () => {/* ast bulder and render*/};

export default (dataPath1, dataPath2) => {
  const readedData1 = fs.readFileSync(dataPath1);
  const readedData2 = fs.readFileSync(dataPath2);

  const data1 = parse(dataPath1, readedData1);
  const data2 = parse(dataPath2, readedData2);
  return diff(data1, data2);
};
