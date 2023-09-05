import { Item } from './Item';
import { Pokemon } from './Pokemon';

export type Product = Item | Pokemon;
export type ProductType = 'item' | 'pokemon';
export interface CartProduct<T> {
  quantity: number;
  product: T;
}
