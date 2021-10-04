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

const testBinarySearchRightmost = (array, value, expIndex) => {
  it(`finds the index for the value ${value} in ${array}`, () => {
    const index = searching.binarySearchRightmost(array, value);
    expect(index).toBe(expIndex);
  });
};

//------------------------------------------------------------------------------

describe('Searching utilities and algorithms', () => {
  describe('Binary search: Leftmost match', () => {
    testBinarySearchLeftmost([], 1, undefined);
    testBinarySearchLeftmost([1], 0, undefined);
    testBinarySearchLeftmost([1], 1, 0);
    testBinarySearchLeftmost([1], 2, undefined);
    testBinarySearchLeftmost([1, 2, 3], 0, undefined);
    testBinarySearchLeftmost([1, 2, 3], 1, 0);
    testBinarySearchLeftmost([1, 2, 3], 2, 1);
    testBinarySearchLeftmost([1, 2, 3], 3, 2);
    testBinarySearchLeftmost([1, 2, 3], 4, undefined);
    testBinarySearchLeftmost([1, 2, 2, 2, 3], 2, 1);
    testBinarySearchLeftmost([2, 2, 2, 2, 3], 2, 0);
  });

  //----------------------------------------------------------------------------

  describe('Binary search: Rightmost match', () => {
    testBinarySearchRightmost([], 1, undefined);
    testBinarySearchRightmost([1], 0, undefined);
    testBinarySearchRightmost([1], 1, 0);
    testBinarySearchRightmost([1], 2, undefined);
    testBinarySearchRightmost([1, 2, 3], 0, undefined);
    testBinarySearchRightmost([1, 2, 3], 1, 0);
    testBinarySearchRightmost([1, 2, 3], 2, 1);
    testBinarySearchRightmost([1, 2, 3], 3, 2);
    testBinarySearchRightmost([1, 2, 3], 4, undefined);
    testBinarySearchRightmost([1, 2, 2, 2, 3], 2, 3);
    testBinarySearchRightmost([1, 2, 2, 2, 2], 2, 4);
  });
});
