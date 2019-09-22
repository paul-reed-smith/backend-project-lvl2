import fs from 'fs';

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const readFile = (path) => fs.readFileSync(path); // realy need this?

export { isEmptyObject, readFile };
