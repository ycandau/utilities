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
  return array[left] === value ? left : undefined;
};

//------------------------------------------------------------------------------
// Binary search: Rightmost on multiple matches

const binarySearchRightmost = (array, value) => {
  let left = 0;
  let right = array.length;

  while (left < right) {
    let mid = (left + right) >> 1;
    if (array[mid] <= value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return array[left - 1] === value ? left - 1 : undefined;
};

//------------------------------------------------------------------------------
// Binary search: Alternative with three cases
// NB: No guarantee of which value is found if not unique

const binarySearchAlt = (array, value) => {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (value > array[mid]) {
      low = mid + 1;
    } else if (value < array[mid]) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return undefined;
};

//------------------------------------------------------------------------------

module.exports = {
  binarySearchLeftmost,
  binarySearchRightmost,
  binarySearchAlt,
};
