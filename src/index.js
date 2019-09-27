import fs from 'fs';

const genDiff = (dataPath1, dataPath2) => {
  const dataRead1 = fs.readFileSync(dataPath1);
  const dataRead2 = fs.readFileSync(dataPath2);

  const data1 = JSON.parse(dataRead1);
  const data2 = JSON.parse(dataRead2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const allKeys = Object.keys({ ...data1, ...data2 });

  const added = keys2.filter((el) => !keys1.includes(el));
  const deleted = keys1.filter((el) => !keys2.includes(el));

  const kyesWithModifedValues = allKeys
    .filter((v) => !added.includes(v) && !deleted.includes(v))
    .filter((el) => data1[el] !== data2[el]);

  const res = allKeys.reduce((acc, key) => {
    if (added.includes(key)) {
      acc.push(`  + ${key}: ${data2[key]}\n`);
    } else if (deleted.includes(key)) {
      acc.push(`  - ${key}: ${data1[key]}\n`);
    } else if (kyesWithModifedValues.includes(key)) {
      acc.push(`  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}\n`);
    } else {
      acc.push(`    ${key}: ${data2[key]}\n`);
    }
    return acc;
  }, []);

  return `{
${res.join('')}}`;
};

export default genDiff;
