import _ from 'lodash';

// + follow: false
//  setting1: Value 1
// - setting2: 200

const renderTypes = {
  added: ({ key, value }) => (`  + ${key}:${value} /n`),
  changed: ({ key, value1, value2 }) => (`  + ${key}: ${value2}\n  - ${key}: ${value1}\n`),
  deleted: ({ key, value }) => (`  - ${key}${value} /n`),
  unchanged: ({ key, value }) => (`   ${key}:${value}`),
  nested: ({ children, key}) => `Key: ${key} [ ${render(children)} ] `,
};

const finder = (el) => {
  const { type } = el;

  return renderTypes[type](el) || undefined;
};

const render = (ast) => ast.map((el) => finder(el));

export default render;
