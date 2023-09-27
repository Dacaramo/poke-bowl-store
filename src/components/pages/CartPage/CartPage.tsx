import { FC } from 'react';

import { toPriceString } from '../../../utils/stringUtils';
import { useStore } from '../../../zustand/store';

import List from './List/List';

interface Props {}

const CartPage: FC<Props> = () => {
  const cartProducts = useStore((state) => {
    return state.cartProducts;
  });

  const tax = 0.06;
  const itemsCount = cartProducts.length;
  const pricesBeforeTax = cartProducts.map((cartProduct) => {
    return cartProduct.product.price! * cartProduct.quantity;
  });
  const subTotal = pricesBeforeTax.reduce((acc, current) => {
    acc += current;
    return acc;
  }, 0);
  const grandTotal = subTotal * (1 + tax);

  return (
    <div className='flex flex-col justify-start items-center'>
      <List products={cartProducts} />
      {/* <div className='w-full z-[10] h-[10vh] mt-2 bg-red-500' /> */}
      <div className='fixed bottom-0 left-0 px-6 flex flex-row justify-end items-center w-full h-[10vh] drop-shadow drop-shadow-above bg-white'>
        {itemsCount > 0 ? (
          <>
            <div className='flex flex-col gap-0 sm:gap-1'>
              <p className='text-zinc-950 text-end font-nunito'>
                <span className='text-sm sm:text-lg'>Sub total</span>{' '}
                <span className='text-sm sm:text-lg'>
                  {'(US$ '}
                  {toPriceString(subTotal)}
                  {')'}
                </span>{' '}
              </p>
              <p className='text-zinc-950 text-end font-nunito'>
                <span className='text-lg sm:text-2xl'>Total</span>{' '}
                <span className='text-lg sm:text-2xl'>
                  <b>
                    {'(US$ '}
                    {toPriceString(grandTotal)}
                    {')'}
                  </b>
                </span>{' '}
              </p>
            </div>
            <button
              type='button'
              className='h-fit ml-4 px-3 py-2 text-xl font-nunito font-bold text-zinc-50 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700'
            >
              {`Pay`}
            </button>
          </>
        ) : (
          <p className='text-xl text-zinc-950 font-nunito font-light'>
            Your shopping cart is empty
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
