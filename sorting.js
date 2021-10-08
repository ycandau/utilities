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
// Bubble sort: O(n^2)

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
// Quick sort: O(n * log(n))

const partition = (array, begin, end, compare) => {
  let low = begin;
  let high = begin;
  const pivot = array[end];

  // Partition by growing the low and high sequences
  while (high < end) {
    if (pivot < array[high]) {
      high++;
    } else {
      const tmp = array[low];
      array[low] = array[high];
      array[high] = tmp;
      low++;
      high++;
    }
  }

  // Place the pivot
  array[end] = array[low];
  array[low] = pivot;

  // Pivot index
  return low;
};

const quickRecurse = (array, begin, end, compare) => {
  if (begin < end) {
    const part = partition(array, begin, end, compare);
    quickRecurse(array, begin, part - 1, compare);
    quickRecurse(array, part + 1, end, compare);
  }
};

const quick = (sourceArray, compare) => {
  const array = [...sourceArray];
  quickRecurse(array, 0, array.length - 1, compare);
  return array;
};

//------------------------------------------------------------------------------

module.exports = {
  selection,
  bubble,
  quick,
};
