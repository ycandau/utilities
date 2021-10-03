//------------------------------------------------------------------------------
// Helper:

const match = (str, pos1, pos2) => {
  let len = 0;
  while (str[pos1 + len] === str[pos2 + len] && pos2 + len < str.length) len++;
  return len;
};
