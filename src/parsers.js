import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const types = {
  '.json': (data) => JSON.parse(data),
  '.ini': (data) => ini.parse(data),
  '.yaml': (data) => yaml.safeLoad(data),
};

export default (dataPath, data) => {
  const ext = path.extname(dataPath);
  return types[ext](data);
};
