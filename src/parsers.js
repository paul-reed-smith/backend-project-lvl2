import ini from 'ini';
import yaml from 'js-yaml';

const types = {
  json: JSON.parse,
  ini: ini.parse,
  yaml: yaml.safeLoad,
};

export default (data, type) => types[type](data);
