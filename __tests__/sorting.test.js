//------------------------------------------------------------------------------
// Test the sorting utilities and algorithms
//------------------------------------------------------------------------------

const { expect } = require('@jest/globals');
const sorting = require('../sorting.js');

//------------------------------------------------------------------------------

const testSortSelection = (array, expArray) => {
  it(`sorts the array ${array}`, () => {
    const sorted = sorting.sortSelection(array);
    expect(sorted).toEqual(expArray);
  });
};

//------------------------------------------------------------------------------

describe('Sorting utilities and algorithms', () => {
  describe('Selection sort', () => {
    testSortSelection([], []);
    testSortSelection([1], [1]);
    testSortSelection([1, 2, 3, 4], [1, 2, 3, 4]);
    testSortSelection([4, 1, 3, 2], [1, 2, 3, 4]);
  });
});
