//------------------------------------------------------------------------------
// Sorting utilities and algorithms
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Selection sort: O(n^2)

const sortSelection = (array) => {
  const copy = [...array];

  for (let i = 0; i < copy.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < copy.length; j++) {
      if (copy[j] < copy[indexMin]) {
        indexMin = j;
      }
    }
    const tmp = copy[i];
    copy[i] = copy[indexMin];
    copy[indexMin] = tmp;
  }
  console.log(copy);
  return copy;
};

//------------------------------------------------------------------------------

module.exports = {
  sortSelection,
};
