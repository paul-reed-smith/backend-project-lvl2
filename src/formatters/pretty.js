import _ from 'lodash';

const indentCalc = (nestingLevel) => {
  const res = '  '.repeat(nestingLevel);
  return res;
};

const valueChecker = (value, nestingLevel) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const mapped = keys.map((el) => `${indentCalc(nestingLevel + 3)}${el}: ${value[el]}`);
    const stringed = mapped.join('\n');

    return `{ \n${stringed}\n${indentCalc(nestingLevel + 1)}}`;
  }


  return value;
};

const renderTypes = {
  added: ({ key, value }, nestingLevel) => `${indentCalc(nestingLevel)}+ ${key}: ${valueChecker(value, nestingLevel)}\n`,
  changed: ({ key, value1, value2 }, nestingLevel) => `${indentCalc(nestingLevel)}+ ${key}: ${valueChecker(value2, nestingLevel)}\n${indentCalc(nestingLevel)}- ${key}: ${valueChecker(value1, nestingLevel)}\n`,
  deleted: ({ key, value }, nestingLevel) => `${indentCalc(nestingLevel)}- ${key}: ${valueChecker(value, nestingLevel)}\n`,
  unchanged: ({ key, value }, nestingLevel) => `${indentCalc(nestingLevel)}  ${key}: ${valueChecker(value, nestingLevel)}\n`,
  nested: ({ key, children }, nestingLevel, func) => `${indentCalc(nestingLevel)}${key}: ${func(children, nestingLevel)}\n`,

};


const finder = (el, nestingLevel, func) => {
  const { type } = el;
  if (_.isObject(el)) {
    const newNestingLevel = nestingLevel + 1;

    return renderTypes[type](el, newNestingLevel, func);
  }

  return renderTypes[type](el, nestingLevel);
};

const render = (ast, nestingLevel) => {
  const rendered = ast.map((el) => finder(el, nestingLevel, render));

  return `{ \n${rendered.join('')}${indentCalc(nestingLevel - 1)}}`;
};

const startingTestingLevel = 1;

export default (ast) => render(ast, startingTestingLevel);
