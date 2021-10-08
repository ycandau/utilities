//------------------------------------------------------------------------------
// Test the sorting utilities and algorithms
//------------------------------------------------------------------------------

const { expect } = require('@jest/globals');
const sort = require('../sorting.js');

//------------------------------------------------------------------------------

const compare = (a, b) => a - b;

const testSortOnce = (array, sort) => {
  it(`sorts the array ${array}`, () => {
    const sorted = sort(array, compare);
    const expected = [...array].sort(compare);
    expect(sorted).toEqual(expected);
  });
};

const testSort = (type, sort) => {
  describe(`${type} sort`, () => {
    testSortOnce([], sort);
    testSortOnce([1], sort);
    testSortOnce([1, 2, 3, 4], sort);
    testSortOnce([4, 1, 3, 2], sort);
  });
};

//------------------------------------------------------------------------------

describe('Sorting utilities and algorithms', () => {
  testSort('Selection', sort.selection);
  testSort('Bubble', sort.bubble);
  testSort('Quick', sort.quick);

  //----------------------------------------------------------------------------
});
