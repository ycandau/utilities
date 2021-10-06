//------------------------------------------------------------------------------
// Sorting utilities and algorithms
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Selection sort: O(n^2)

const selection = (sourceArray, compare) => {
  const array = [...sourceArray];

  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (compare(array[indexMin], array[j]) > 0) {
        indexMin = j;
      }
    }
    const tmp = array[i];
    array[i] = array[indexMin];
    array[indexMin] = tmp;
  }
  return array;
};

//------------------------------------------------------------------------------

const bubble = (sourceArray, compare) => {
  const array = [...sourceArray];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        const tmp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = tmp;
      }
    }
  }
  return array;
};

//------------------------------------------------------------------------------

module.exports = {
  selection,
  bubble,
};
