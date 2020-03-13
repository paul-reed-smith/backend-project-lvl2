import _ from 'lodash';

const fourSpaces = '    ';

const calculateTheindent = (indent) => indent + fourSpaces;

const closingCurlyBracketIndentCalculator = (indent) => {
  const lengthMinusTwo = indent.length - 2;

  return indent.substring(0, lengthMinusTwo);
};

const checkTheValue = (value, indent) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const newIndent = calculateTheindent(indent);
    const mapped = keys.map((el) => `${newIndent}  ${el}: ${value[el]}`);
    const stringed = mapped.join('\n');

    return `{\n${stringed}\n${closingCurlyBracketIndentCalculator(newIndent)}}`;
  }

  return value;
};

const stringify = (indent, sign, key, value) => {
  const checkedValue = checkTheValue(value, indent);

  return `${indent}${sign} ${key}: ${checkedValue}\n`;
};

const renderTypes = {
  added: ({ key, value }, indent) => stringify(indent, '+', key, value),
  changed: ({ key, value1, value2 }, indent) => {
    const added = stringify(indent, '+', key, value2);
    const deleted = stringify(indent, '-', key, value1);

    return `${deleted}${added}`;
  },
  deleted: ({ key, value }, indent) => stringify(indent, '-', key, value),
  unchanged: ({ key, value }, indent) => stringify(indent, ' ', key, value),
  nested: ({ key, children }, indent, func) => {
    const newIndent = calculateTheindent(indent);

    return `${indent}  ${key}: ${func(children, newIndent)}\n`;
  },

};


const finder = (el, indent, func) => {
  const { type } = el;

  return renderTypes[type](el, indent, func);
};

const render = (ast, indent) => {
  const rendered = ast.map((el) => finder(el, indent, render));

  return `{\n${rendered.join('')}${closingCurlyBracketIndentCalculator(indent)}}`;
};

const baseindent = '  ';

export default (ast) => render(ast, baseindent);
