import { Item } from '../model/Item';
import { Pokemon } from '../model/Pokemon';
import { Product, ProductType } from '../model/Product';

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

export const determineProductCost = (
  product: Product,
  type: ProductType
): number => {
  if (type === 'pokemon') {
    return (product as Pokemon).baseExperience * 1000;
  } else if (type === 'item') {
    if ((product as Item).name === 'master-ball') {
      return 10000;
    } else if ((product as Item).cost === 0) {
      return Math.random() * 5000;
    }
    return (product as Item).cost;
  }

  throw new UnknownProductError();
};
