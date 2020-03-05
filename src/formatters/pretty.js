import _ from 'lodash';

const indentCalc = (nestingLevel) => '  '.repeat(nestingLevel);

const valueChecker = (value, nestingLevel) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const mapped = keys.map((el) => `${indentCalc(nestingLevel + 3)}${el}: ${value[el]}`);
    const stringed = mapped.join('\n');

    return `{\n${stringed}\n${indentCalc(nestingLevel + 1)}}`;
  }


  return value;
};

const stringify = (nestingLevel, sign, key, value) => {
  const indent = indentCalc(nestingLevel);
  const checkedValue = valueChecker(value, nestingLevel);

  return `${indent}${sign} ${key}: ${checkedValue}\n`;
};

const renderTypes = {
  added: ({ key, value }, nestingLevel) => stringify(nestingLevel, '+', key, value),
  changed: ({ key, value1, value2 }, nestingLevel) => {
    const added = stringify(nestingLevel, '+', key, value2);
    const deleted = stringify(nestingLevel, '-', key, value1);

    return `${added}${deleted}`;
  },
  deleted: ({ key, value }, nestingLevel) => stringify(nestingLevel, '-', key, value),
  unchanged: ({ key, value }, nestingLevel) => stringify(nestingLevel, ' ', key, value),
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

  return `{\n${rendered.join('')}${indentCalc(nestingLevel - 1)}}`;
};

const startingTestingLevel = 1;

export default (ast) => render(ast, startingTestingLevel);
