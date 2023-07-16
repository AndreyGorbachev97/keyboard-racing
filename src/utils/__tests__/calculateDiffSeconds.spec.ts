import { calculateDiffSeconds } from '../calculateDiffSeconds';

describe('calculateDiffSeconds', () => {
  it('returns the correct difference in seconds', () => {
    // Example test case
    const startDate = new Date('2022-01-01T00:00:00Z');
    const currentDate = new Date('2022-01-01T00:00:10Z');
    const expectedResult = 10;

    const result = calculateDiffSeconds(startDate, currentDate);
    expect(result).toEqual(expectedResult);
  });

  it('returns 0 if the startDate and currentDate are the same', () => {
    // Test case when the startDate and currentDate are the same
    const startDate = new Date('2022-01-01T00:00:00Z');
    const currentDate = new Date('2022-01-01T00:00:00Z');

    const result = calculateDiffSeconds(startDate, currentDate);
    expect(result).toEqual(0);
  });
});
