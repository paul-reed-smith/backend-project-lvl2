import fs from 'fs';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const buildNode = (data1, data2, key, f) => {
  const actions = [
    {
      check: () => !(_.has(data1, key)),
      build: () => ({ type: 'added', key, value: data2[key] }),
    },
    {
      check: () => !(_.has(data2, key)),
      build: () => ({ type: 'deleted', key, value: data1[key] }),
    },
    {
      check: () => _.isObject(data1[key]) && _.isObject(data2[key]),
      build: () => ({ type: 'nested', key, children: f(data1[key], data2[key]) }),
    },
    {
      check: () => data1[key] !== data2[key],
      build: () => (
        {
          type: 'changed', key, value1: data1[key], value2: data2[key],
        }),
    },
    {
      check: () => data1[key] === data2[key],
      build: () => ({ type: 'unchanged', key, value2: data2[key] }),
    },
  ];
  const checkedNode = actions.find(({ check }) => check());

  return checkedNode.build();
};

const buildAST = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const unKeys = _.union(dataKeys1, dataKeys2);

  return unKeys.map((key) => buildNode(data1, data2, key, buildAST));
};

const diff = (data1, data2) => {
  const ast = buildAST(data1, data2);
  const rendered = render(ast);

  return rendered;
};

export default (dataPath1, dataPath2) => {
  const readedData1 = fs.readFileSync(dataPath1);
  const readedData2 = fs.readFileSync(dataPath2);

  const data1 = parse(dataPath1, readedData1);
  const data2 = parse(dataPath2, readedData2);
  return diff(data1, data2);
};
