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
    testBinarySearchLeftmost([], 1, 0);
    testBinarySearchLeftmost([1], 0, 0);
    testBinarySearchLeftmost([1], 1, 0);
    testBinarySearchLeftmost([1], 2, 0);
    testBinarySearchLeftmost([1, 2, 3], 0, 0);
    testBinarySearchLeftmost([1, 2, 3], 0.5, 0);
    testBinarySearchLeftmost([1, 2, 3], 1, 0);
    testBinarySearchLeftmost([1, 2, 3], 1.5, 1);
    testBinarySearchLeftmost([1, 2, 3], 2, 1);
    testBinarySearchLeftmost([1, 2, 3], 3, 2);
    testBinarySearchLeftmost([1, 2, 3], 3.5, 2);
    testBinarySearchLeftmost([1, 2, 3], 4, 2);
    testBinarySearchLeftmost([1, 2, 2, 2, 3], 2, 1);
  });
});
