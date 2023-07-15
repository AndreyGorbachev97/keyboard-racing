export const calculateCharactersPerMinute = (count: number, time: number): number => {
  return Number(((count * 60) / time).toFixed(2)) || 0;
};
