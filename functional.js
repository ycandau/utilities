//------------------------------------------------------------------------------
// Functional operators

const id = (x) => x;

// Function composition, first function first
const pipe =
  (...functions) =>
  (x) =>
    functions.reduce((val, func) => func(val), x);

const forEach = (...functions) =>
  functions.length === 1
    ? (array) => array.forEach(functions[0])
    : (array) => array.forEach(pipe(...functions));

const map = (...functions) =>
  functions.length === 1
    ? (array) => array.map(functions[0])
    : (array) => array.map(pipe(...functions));

const reduce = (func, init) => (array) => array.reduce(func, init);

const toArray = (x) => (Array.isArray(x) ? x : [x]);

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;
const sort = (compare, get) => (array) =>
  [...array].sort((a, b) => compare(get(a), get(b)));

const get = (key) => (obj) => obj[key];
const toValues = (obj) => Object.values(obj);
