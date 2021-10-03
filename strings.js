//------------------------------------------------------------------------------
// Helper: Match substrings within a string

const match = (str, pos1, pos2) => {
  let len = 0;
  while (str[pos1 + len] === str[pos2 + len] && pos2 + len < str.length) {
    len++;
  }
  return len;
};

//------------------------------------------------------------------------------
// Z algorithm

const getZValues = (str) => {
  let pos = 1;
  let begin = 0;
  let end = 0;
  let z = [str.length]; // The first value is irrelevant.

  while (pos < str.length) {
    // The position is beyond the rightmost matching range.
    // Calculate the Z value in the obvious way.
    if (pos > end) {
      const length = match(str, 0, pos);
      z[pos] = length;

      // Set the range.
      // No need to add condition as pos will be beyond on next iteration.
      begin = pos;
      end = pos + length - 1;
    }

    // The position is within range and the Z value contained within the range.
    // The Z value is known and equal to the value from the prefix.
    else if (z[pos - begin] < end - pos + 1) {
      z[pos] = z[pos - begin];
    }

    // The position is within range and the Z value reaches beyond the range.
    // The Z value is at least equal to the value from the prefix.
    // Extend the search beyond the matching range.
    else {
      begin = pos;
      end += match(str, end - pos + 1, end + 1);
      z[pos] = end - pos + 1;
    }
    pos++;
  }

  return z;
};

//------------------------------------------------------------------------------
// Substring search in linear time using Z values

const find = (str, sub) => {
  const finds = [];
  const length = sub.length;

  // Use the Z values of the concatenated strings to find the matches
  getZValues(sub + str)
    .slice(length)
    .forEach((zValue, index) => {
      if (zValue >= length) {
        finds.push(index);
      }
    });

  return finds;
};

//------------------------------------------------------------------------------

module.exports = {
  getZValues,
  find,
};
