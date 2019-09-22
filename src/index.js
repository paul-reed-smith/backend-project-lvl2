/* eslint-disable */   
import fs from 'fs';

export default (dataPath1, dataPath2) => {
  const data1 = fs.readFileSync(dataPath1);
  const data2 = fs.readFileSync(dataPath2);

  const parsedData1 = JSON.parse(Data1);
  const parsedData2 = JSON.parse(Data2);

};
