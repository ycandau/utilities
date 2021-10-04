//------------------------------------------------------------------------------
// Searching utilities and algorithms
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Binary search: Leftmost on multiple matches

const binarySearchLeftmost = (array, value) => {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    let mid = (left + right) >> 1;
    if (array[mid] < value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

//------------------------------------------------------------------------------

module.exports = {
  binarySearchLeftmost,
};
