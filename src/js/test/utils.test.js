const UTILS = require('../utils');

describe('isCyrillic', () => {
  it('should return boolean', () => {
    expect(UTILS.isCyrillic('word')).toBeDefined();
    expect(UTILS.isCyrillic('игра')).toBe(true);
    expect(UTILS.isCyrillic('game')).toBe(false);
    expect(UTILS.isCyrillic('АБВГД')).toBeTruthy();
    expect(UTILS.isCyrillic('ABCD')).toBeFalsy();
    expect(UTILS.isCyrillic('ABCDАБВГ')).toBeTruthy();
  });
});
