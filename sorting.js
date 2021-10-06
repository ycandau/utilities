//------------------------------------------------------------------------------
// Sorting utilities and algorithms
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Selection sort: O(n^2)

const sortSelection = (array) => {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j;
      }
    }
    const tmp = array[i];
    array[i] = array[indexMin];
    array[i] = tmp;
  }

  return array;
};
