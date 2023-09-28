import { create } from 'zustand';

import { CartProduct, Product } from '../model/Product';

interface StoreState {
  secondsCount: number;
  decrementSecondsCount: () => void;
  cartProducts: Array<CartProduct<Product>>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  changeProductQuantity: (index: number, quantity: number) => void;
}

export const useStore = create<StoreState>()((set) => {
  return {
    secondsCount: 6,
    decrementSecondsCount: () => {
      return set((state) => {
        return {
          secondsCount: state.secondsCount - 1,
        };
      });
    },
    cartProducts: [],
    addToCart: (product: Product, quantity: number = 0) => {
      return set((state) => {
        return {
          cartProducts: [...state.cartProducts, { product, quantity }],
        };
      });
    },
    removeFromCart: (index: number) => {
      return set((state) => {
        return {
          cartProducts: state.cartProducts.filter((_, i) => i !== index),
        };
      });
    },
    changeProductQuantity: (index: number, quantity: number) => {
      return set((state) => {
        return {
          cartProducts: state.cartProducts.map((product, i) => {
            return i === index ? { ...product, quantity } : product;
          }),
        };
      });
    },
  };
});
