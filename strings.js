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
  let pos = 0;
  let begin = -1;
  let end = -1;
  let z = [];
  let k = 0;

  while (pos < str.length) {
    if (pos > end) {
      const length = match(str, 0, pos);
      z[pos] = length;
      if (length) {
        begin = pos;
        end = pos + length - 1;
      }
    } else if (pos <= end) {
      if (z[pos - begin] < end - pos + 1) {
        z[pos] = z[pos - begin];
      } else {
        begin = pos;
        end += match(str, end - pos + 1, end + 1);
        z[pos] = end - pos + 1;
      }
    }

    pos++;
  }
};
