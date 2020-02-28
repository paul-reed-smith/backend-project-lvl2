// { type: 'added', key, value: data2[key] }
// { type: 'deleted', key, value: data1[key] }
// { type: 'changed', key, value1: data1[key], value2: data2[key]}
// { type: 'unchanged', key, value2: data2[key] }
// { type: 'nested', key, children: f(data1[key], data2[key]) }

export default () => true;
