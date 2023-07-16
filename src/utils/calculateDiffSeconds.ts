export const calculateDiffSeconds = (startDate: Date, currentDate: Date): number => {
  return (currentDate.getTime() - startDate.getTime()) / 1000;
};
