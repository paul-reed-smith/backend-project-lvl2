import _ from 'lodash';

const format = (value) => {
  if (_.isObject(value)) return "'[complex value]'";
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const actions = {
  added: ({ key, value }, path) => `Property '${path}${key}' was added with value: ${format(value)}`,
  deleted: ({ key }, path) => `Property '${path}${key}' was deleted`,
  changed: ({ key, value1, value2 }, path) => `Property '${path}${key}' was changed from ${format(value1)} to ${format(value2)}`,
  nested: ({ key, children }, path, f) => f(children, `${path}${key}.`),
  unchanged: () => [],
};

const render = (ast, path = '') => _.flattenDeep(
  ast.map((el) => {
    const { type } = el;
    const finded = actions[type];
    return finded(el, path, render);
  }),
).join('\n');

export default render;
