//------------------------------------------------------------------------------
// Test the searching utilities and algorithms
//------------------------------------------------------------------------------

const { expect } = require('@jest/globals');
const searching = require('../searching.js');

//------------------------------------------------------------------------------

const testBinarySearchLeftmost = (array, value, expIndex) => {
  it(`finds the index for the value ${value} in ${array}`, () => {
    const index = searching.binarySearchLeftmost(array, value);
    expect(index).toBe(expIndex);
  });
};

//------------------------------------------------------------------------------

describe('Searching utilities and algorithms', () => {
  describe('Binary search: Leftmost match', () => {
    testBinarySearchLeftmost([1, 2, 3], 1, 0);
    testBinarySearchLeftmost([1, 2, 3], 2, 1);
    testBinarySearchLeftmost([1, 2, 3], 3, 2);
  });
});
