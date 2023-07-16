import { calculateCharactersPerMinute } from '../calculateCharactersPerMinute';

describe('calculateCharactersPerMinute', () => {
  it('returns the correct characters per minute', () => {
    const count = 50;
    const time = 120;
    const expectedResult = 25;

    const result = calculateCharactersPerMinute(count, time);
    expect(result).toEqual(expectedResult);
  });

  it('returns 0 if the count or time is 0', () => {
    const count = 0;
    const time = 60;

    const result = calculateCharactersPerMinute(count, time);
    expect(result).toEqual(0);

    const count2 = 100;
    const time2 = 0;

    const result2 = calculateCharactersPerMinute(count2, time2);
    expect(result2).toEqual(0);
  });
});
