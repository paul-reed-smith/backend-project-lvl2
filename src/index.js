import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import getRender from './formatters';

const actions = [
  {
    check: (data1, data2, key) => !(_.has(data1, key)),
    build: (data1, data2, key) => ({ type: 'added', key, value: data2[key] }),
  },
  {
    check: (data1, data2, key) => !(_.has(data2, key)),
    build: (data1, data2, key) => ({ type: 'deleted', key, value: data1[key] }),
  },
  {
    check: (data1, data2, key) => _.isObject(data1[key]) && _.isObject(data2[key]),
    build: (data1, data2, key, f) => ({ type: 'nested', key, children: f(data1[key], data2[key]) }),
  },
  {
    check: (data1, data2, key) => data1[key] !== data2[key],
    build: (data1, data2, key) => (
      {
        type: 'changed', key, value1: data1[key], value2: data2[key],
      }),
  },
  {
    check: (data1, data2, key) => data1[key] === data2[key],
    build: (data1, data2, key) => ({ type: 'unchanged', key, value: data1[key] }),
  },
];

const buildNode = (data1, data2, key, f) => {
  const checkedNode = actions.find(({ check }) => check(data1, data2, key));

  return checkedNode.build(data1, data2, key, f);
};

const buildAST = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const unKeys = _.union(dataKeys1, dataKeys2);

  return unKeys.map((key) => buildNode(data1, data2, key, buildAST));
};

const getFormatFromExtension = (dataPath) => {
  const extension = path.extname(dataPath);
  const dataFormat = extension.substr(1);

  return dataFormat;
};

const readData = (dataPath) => fs.readFileSync(dataPath, 'utf-8');

export default (dataPath1, dataPath2, format = 'pretty') => {
  const readedData1 = readData(dataPath1);
  const readedData2 = readData(dataPath2);

  const format1 = getFormatFromExtension(dataPath1);
  const format2 = getFormatFromExtension(dataPath2);

  const data1 = parse(readedData1, format1);
  const data2 = parse(readedData2, format2);

  const ast = buildAST(data1, data2);
  const render = getRender(format);

  return render(ast);
};
