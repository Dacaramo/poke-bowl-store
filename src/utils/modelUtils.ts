import { Product, ProductType } from '../model/Product';

import { makeStringDisplayable } from './stringUtils';

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
  } else if ('cost' in product) {
    return 'item';
  }

  throw new UnknownProductError();
};

export const determineProductPrice = (
  product: Record<string, unknown>,
  type: ProductType
): number => {
  if (type === 'pokemon') {
    return (product.baseExperience as number) * 1000;
  } else if (type === 'item') {
    if (product.name === 'master-ball') {
      return 10000;
    } else if (product.cost === 0) {
      return Math.random() * 5000;
    }
    return product.cost as number;
  }

  throw new UnknownProductError();
};

export const determinePokemonTypeColor = (pokemonType: string): string => {
  switch (pokemonType) {
    case 'normal':
      return '#A8A878';
    case 'fighting':
      return '#C03028';
    case 'flying':
      return '#A890F0';
    case 'poison':
      return '#A040A0';
    case 'ground':
      return '#E0C068';
    case 'rock':
      return '#B8A038';
    case 'bug':
      return '#A8B820';
    case 'ghost':
      return '#705898';
    case 'steel':
      return '#B8B8D0';
    case 'fire':
      return '#F08030';
    case 'water':
      return '#6890F0';
    case 'grass':
      return '#78C850';
    case 'electric':
      return '#F8D030';
    case 'psychic':
      return '#F85888';
    case 'ice':
      return '#98D8D8';
    case 'dragon':
      return '#7038F8';
    case 'dark':
      return '#705848';
    case 'fairy':
      return '#EE99AC';
    case 'unknown':
      return '#68A090';
    case 'shadow':
      return '#555555';
    default:
      throw Error('Unknown pokemon type, unable to define the color');
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
        levelNames.push(makeStringDisplayable(current.species.name));
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

export const extractPokemonIdFromUrl = (url: string): string => {
  const tokenizedUrl = url.split('/');
  return tokenizedUrl[tokenizedUrl.length - 2];
};
