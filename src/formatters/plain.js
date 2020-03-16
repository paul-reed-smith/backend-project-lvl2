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
  nested: ({ key, children }, path, func) => func(children, `${path}${key}.`),
  unchanged: () => [],
};

const render = (ast, path = '') => {
  const mapped = ast.map((el) => {
    const { type } = el;
    const stringifyNode = actions[type];

    return stringifyNode(el, path, render);
  });

  return _.flattenDeep(mapped).join('\n');
};

export default render;
