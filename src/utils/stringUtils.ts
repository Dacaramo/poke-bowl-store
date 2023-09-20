export const toReadableFormat = (inputString: string): string => {
  if (inputString === 'generation-i') {
    return 'Generation I';
  } else if (inputString === 'generation-ii') {
    return 'Generation II';
  } else if (inputString === 'generation-iii') {
    return 'Generation III';
  } else if (inputString === 'generation-iv') {
    return 'Generation IV';
  } else if (inputString === 'generation-v') {
    return 'Generation V';
  } else if (inputString === 'generation-vi') {
    return 'Generation VI';
  } else if (inputString === 'generation-vii') {
    return 'Generation VII';
  } else if (inputString === 'generation-viii') {
    return 'Generation VIII';
  } else if (inputString === 'generation-ix') {
    return 'Generation IX';
  } else if (inputString.startsWith('tm') || inputString.startsWith('tr')) {
    return inputString.toUpperCase();
  }

  const words = inputString.split('-');

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const formattedString = capitalizedWords.join(' ');

  return formattedString;
};

export const toPriceString = (number: number): string => {
  const numStr = String(number);

  const parts = numStr.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return parts.join('.');
};

export const toCodeFormat = (input: string): string => {
  const cleanedInput = input.replace(/[^\w\s]/g, '');

  const words = cleanedInput.split(' ');

  const lowercaseWords = words.map((word) => word.toLowerCase());

  const camelCase = lowercaseWords
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');

  return camelCase;
};
