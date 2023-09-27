import { FC, memo } from 'react';

import { CartProduct, Product } from '../../../../../model/Product';
import { toPriceString } from '../../../../../utils/stringUtils';
import { useStore } from '../../../../../zustand/store';
import Select from '../../../../Select/Select';

interface Props {
  cartProduct: CartProduct<Product>;
  index: number;
}

const ListItem: FC<Props> = ({ cartProduct, index }) => {
  const [changeProductQuantity, removeFromCart] = useStore((state) => {
    return [state.changeProductQuantity, state.removeFromCart];
  });

  const handleChangeOnSelect = (value: string) => {
    changeProductQuantity(index, parseInt(value));
  };

  const handleClickOnRemove = () => {
    removeFromCart(index);
  };

  return (
    <li
      key={cartProduct.product.name}
      className='w-full p-4 flex flex-row flex-wrap gap-2 justify-start items-center border border-zinc-100'
    >
      <img
        className='w-[90px] h-[90px] object-contain text-center'
        src={cartProduct.product.sprites[0]}
        alt={`${cartProduct.product.name} image`}
      />
      <div className='ml-2'>
        <p className='text-2xl font-nunito font-bold'>
          {cartProduct.product.name}
        </p>
        <p className={'text-lg font-nunito text-zinc-950'}>
          {cartProduct.product.price && (
            <span className='text-sm font-nunito text-zinc-950'>US$</span>
          )}
          <b className='ml-1'>{`${
            cartProduct.product.price
              ? toPriceString(cartProduct.product.price)
              : 'Not for sale'
          }`}</b>
        </p>
      </div>
      <div className='sm:ml-auto flex flex-row items-end gap-2'>
        <Select
          id={cartProduct.product.name}
          label='quantity'
          width='sm'
          isNoneOptionAllowed={false}
          isLabelHidden={false}
          value={cartProduct.quantity.toString()}
          onChange={handleChangeOnSelect}
          options={['1', '2', '3', '4', '5']}
        />
        <div className='w-[1px] h-[40px] bg-zinc-100' />
        <button
          type='button'
          className='min-h-[30px] text-sm h-auto px-2 rounded-lg font-nunito font-bold bg-zinc-100 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500'
          onClick={handleClickOnRemove}
        >
          Remove from cart
        </button>
      </div>
    </li>
  );
};

const Memo = memo(ListItem);

export default Memo;
