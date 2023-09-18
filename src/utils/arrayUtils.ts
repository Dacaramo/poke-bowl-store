export const createConsecutiveNumberArray = (
  from: number,
  to: number
): Array<number> => {
  const numbers = [];
  for (let i = from; i <= to; i++) {
    numbers.push(i);
  }

  return numbers;
};
