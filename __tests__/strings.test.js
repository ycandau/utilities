const { expect } = require('@jest/globals');
const strings = require('../strings.js');

//------------------------------------------------------------------------------

const testZValues = (str, expZValues) => {
  it(`calculates the Z values for ${str}`, () => {
    const [first, ...zValues] = strings.getZValues(str);
    expect(first).toBe(-1);
    expect(zValues.length).toBe(expZValues.length);
    expect(zValues).toEqual(expZValues);
  });
};

//------------------------------------------------------------------------------

describe('String utilities and algorithms', () => {
  describe('Z algorithm', () => {
    testZValues('axxxx', [0, 0, 0, 0]);
    testZValues('aaxxx', [1, 0, 0, 0]);
    testZValues('axxxa', [0, 0, 0, 1]);
    testZValues('aaaaa', [4, 3, 2, 1]);
    testZValues('abcabcabc', [0, 0, 6, 0, 0, 3, 0, 0]);
    testZValues('abcabcxab', [0, 0, 3, 0, 0, 0, 2, 0]);
  });
});
