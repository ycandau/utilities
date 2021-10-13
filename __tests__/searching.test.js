//------------------------------------------------------------------------------
// Test the searching utilities and algorithms
//------------------------------------------------------------------------------

const { expect } = require('@jest/globals');
const searching = require('../searching.js');

//------------------------------------------------------------------------------

const testBinarySearch = (array, value, expIndex, search) => {
  it(`finds the index for the value ${value} in ${array}`, () => {
    const index = search(array, value);
    if (index !== undefined) {
      expect(array[index]).toBe(value);
    }
    if (expIndex !== null) {
      expect(index).toBe(expIndex);
    }
  });
};

//------------------------------------------------------------------------------

describe('Searching utilities and algorithms', () => {
  describe('Binary search: Leftmost match', () => {
    const search = searching.binarySearchLeftmost;
    testBinarySearch([], 1, undefined, search);
    testBinarySearch([1], 0, undefined, search);
    testBinarySearch([1], 1, 0, search);
    testBinarySearch([1], 2, undefined, search);
    testBinarySearch([1, 2, 3], 0, undefined, search);
    testBinarySearch([1, 2, 3], 1, 0, search);
    testBinarySearch([1, 2, 3], 2, 1, search);
    testBinarySearch([1, 2, 3], 3, 2, search);
    testBinarySearch([1, 2, 3], 4, undefined, search);
    testBinarySearch([1, 2, 2, 2, 3], 2, 1, search);
    testBinarySearch([2, 2, 2, 2, 3], 2, 0, search);
  });

  //----------------------------------------------------------------------------

  describe('Binary search: Rightmost match', () => {
    const search = searching.binarySearchRightmost;
    testBinarySearch([], 1, undefined, search);
    testBinarySearch([1], 0, undefined, search);
    testBinarySearch([1], 1, 0, search);
    testBinarySearch([1], 2, undefined, search);
    testBinarySearch([1, 2, 3], 0, undefined, search);
    testBinarySearch([1, 2, 3], 1, 0, search);
    testBinarySearch([1, 2, 3], 2, 1, search);
    testBinarySearch([1, 2, 3], 3, 2, search);
    testBinarySearch([1, 2, 3], 4, undefined, search);
    testBinarySearch([1, 2, 2, 2, 3], 2, 3, search);
    testBinarySearch([1, 2, 2, 2, 2], 2, 4, search);
  });

  //----------------------------------------------------------------------------

  // no guarantee of which value is found if not unique

  describe('Binary search: Alternative with three cases', () => {
    const search = searching.binarySearchAlt;
    testBinarySearch([], 1, undefined, search);
    testBinarySearch([1], 0, undefined, search);
    testBinarySearch([1], 1, 0, search);
    testBinarySearch([1], 2, undefined, search);
    testBinarySearch([1, 2, 3], 0, undefined, search);
    testBinarySearch([1, 2, 3], 1, 0, search);
    testBinarySearch([1, 2, 3], 2, 1, search);
    testBinarySearch([1, 2, 3], 3, 2, search);
    testBinarySearch([1, 2, 3], 4, undefined, search);
    testBinarySearch([1, 2, 2, 2, 3], 2, null, search);
    testBinarySearch([1, 2, 2, 2, 2], 2, null, search);
  });
});
