import { Product, ProductType } from '../model/Product';

import { toReadableFormat } from './stringUtils';

class UnknownProductError extends Error {
  constructor(
    message: string = 'Unknown product type. Maybe some of the PokeAPI schemas have changed'
  ) {
    super(message);
    Object.setPrototypeOf(this, UnknownProductError.prototype);
  }
}

export const determineProductType = (product: Product): ProductType => {
  if ('baseExperience' in product) {
    return 'pokemon';
  } else if ('category' in product) {
    return 'item';
  }

  throw new UnknownProductError();
};

export const determineProductPrice = (
  product: Record<string, unknown>,
  type: ProductType
): number => {
  if (type === 'pokemon') {
    return Math.round((product.baseExperience as number) * 1000);
  } else if (type === 'item') {
    if (product.name === 'master-ball') {
      return 10000;
    } else if (product.cost === 0) {
      return Math.round(Math.random() * 5000);
    }
    return Math.round(product.cost as number);
  }

  throw new UnknownProductError();
};

export const determinePokemonTypeColor = (pokemonType: string): string => {
  switch (pokemonType) {
    case 'Normal':
      return '#A8A878';
    case 'Fighting':
      return '#C03028';
    case 'Flying':
      return '#A890F0';
    case 'Poison':
      return '#A040A0';
    case 'Ground':
      return '#E0C068';
    case 'Rock':
      return '#B8A038';
    case 'Bug':
      return '#A8B820';
    case 'Ghost':
      return '#705898';
    case 'Steel':
      return '#B8B8D0';
    case 'Fire':
      return '#F08030';
    case 'Water':
      return '#6890F0';
    case 'Grass':
      return '#78C850';
    case 'Electric':
      return '#F8D030';
    case 'Psychic':
      return '#F85888';
    case 'Ice':
      return '#98D8D8';
    case 'Dragon':
      return '#7038F8';
    case 'Dark':
      return '#705848';
    case 'Fairy':
      return '#EE99AC';
    case 'Unknown':
      return '#68A090';
    case 'Shadow':
      return '#555555';
    default:
      throw Error(
        `Unknown pokemon type [${pokemonType}], unable to define the color`
      );
  }
};

export const getArrayFromEvolutionChain = (
  chain: Record<string, unknown>
): Array<Array<string>> => {
  const queue = [chain];
  const groupedNames = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNames = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift() as {
        evolvesTo: Array<Record<string, unknown>>;
        species: { name: string };
      };
      if (current.species.name) {
        levelNames.push(toReadableFormat(current.species.name));
      }

      if (current.evolvesTo) {
        queue.push(...current.evolvesTo);
      }
    }

    if (levelNames.length > 0) {
      groupedNames.push(levelNames);
    }
  }

  return groupedNames;
};

export const extractIdFromUrl = (url: string): string => {
  const tokenizedUrl = url.split('/');
  return tokenizedUrl[tokenizedUrl.length - 2];
};
