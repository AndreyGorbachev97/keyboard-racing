export const calculateCharactersPerMinute = (count: number, time: number): number => {
  if (!count || !time) {
    return 0;
  }
  return Number(((count * 60) / time).toFixed(2));
};
