const { expect } = require('@jest/globals');
const { describe } = require('jest-circus');
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

const testFind = (str, sub, expFinds) => {
  it(`finds the substring ${sub} in ${str}`, () => {
    const finds = strings.find(str, sub);
    expect(finds.length).toBe(expFinds.length);
    expect(finds).toEqual(expFinds);
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

  describe('Linear substring search using Z values', () => {
    testFind('aaaaa', 'a', [0, 1, 2, 3, 4]);
  });
});
