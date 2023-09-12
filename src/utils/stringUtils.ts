export const makeStringDisplayable = (inputString: string): string => {
  const words = inputString.split('-');

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const formattedString = capitalizedWords.join(' ');

  return formattedString;
};
