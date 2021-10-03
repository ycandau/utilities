//------------------------------------------------------------------------------
// Helper:

const match = (str, pos1, pos2) => {
  let len = 0;
  while (str[pos1 + len] === str[pos2 + len] && pos2 + len < str.length) len++;
  return len;
};

//------------------------------------------------------------------------------
// Z algorithm

const getZValues = (str) => {
  let pos = 1;
  let begin = -1;
  let end = -1;
  let z = [-1];

  while (pos < str.length) {
    // Position beyond rightmost matching range
    // Simple match
    if (pos > end) {
      const length = match(str, 0, pos);
      z[pos] = length;
      if (length) {
        begin = pos;
        end = pos + length - 1;
      }
    } else if (pos <= end) {
      // Position within range and Z value contained within range
      // Z value is known and equal to value from prefix
      if (z[pos - begin] < end - pos + 1) {
        z[pos] = z[pos - begin];
      }

      // Position within range and Z value reaches beyond range
      // Z value is at least equal to value from prefix
      // and extend search beyond range
      else {
        begin = pos;
        end += match(str, end - pos + 1, end + 1);
        z[pos] = end - pos + 1;
      }
    }
    pos++;
  }

  return z;
};

//------------------------------------------------------------------------------

module.exports = {
  getZValues,
};
