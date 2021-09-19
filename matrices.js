//------------------------------------------------------------------------------
// Helper functions for matrices

const transpose = (matrix) => {
  const transposed = [];
  for (let col = 0; col < matrix[0].length; col++) {
    transposed[col] = matrix.map((row) => row[col]);
  }
  return transposed;
};

const reverse = (array) => {
  const reversed = [];
  array.forEach((elem) => reversed.unshift(elem));
  return reversed;
};

const reverseMatrix = (matrix) => matrix.map((row) => reverse(row));

const diagonals = (matrix) => {
  const [width, height] = [matrix[0].length, matrix.length];
  const diags = [];
  for (let d = 0; d < width + height - 1; d++) {
    const diag = [];
    const maxRow = Math.min(d, height - 1);
    const minRow = Math.max(0, d - width + 1);
    for (let row = maxRow; row >= minRow; row--) {
      diag.push(matrix[row][d - row]);
    }
    diags.push(diag);
  }
  return diags;
};
