const douleIndent = '    ';

const renderTypes = {
  nested: ({ key, children }, indent, func) => `${indent}${key}: \n${func(children, indent)}\n`,
  changed: ({ key, value1, value2 }, indent) => `${indent}+ ${key}: ${value2}\n${indent}- ${key}: ${value1}\n`,
  deleted: ({ key, value }, indent) => `${indent}- ${key}: ${value}\n`,
  unchanged: ({ key, value }, indent) => `${indent}  ${key}: ${value}\n`,
  added: ({ key, value }, indent) => `${indent}+ ${key}: ${value}\n`,
};

const finder = (el, indent, func) => {
  const { type } = el;

  return renderTypes[type](el, indent, func);
};

const render = (ast, indent = '  ') => {
  const newIndent = indent + douleIndent;
  const rendered = ast.map((el) => finder(el, newIndent, render));

  return `${indent}{ \n${rendered.join('')}${indent}}`;
};

export default render;
