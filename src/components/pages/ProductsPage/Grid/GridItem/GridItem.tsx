import { FC, memo, MouseEvent as ReactMouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ZINC_950 } from '../../../../../constants/colors';
import { Item } from '../../../../../model/Item';
import { Pokemon } from '../../../../../model/Pokemon';
import { Product } from '../../../../../model/Product';
import {
  determinePokemonTypeColor,
  determineProductType,
} from '../../../../../utils/modelUtils';
import { toPriceString } from '../../../../../utils/stringUtils';
import { useStore } from '../../../../../zustand/store';
import ImageCarrousel from '../../../../ImageCarrousel/ImageCarrousel';

interface Props {
  product: Product;
  onMouseEnter: () => void;
  evolutionMap?: Record<string, Pokemon>;
}

const GridItem: FC<Props> = ({
  product,
  onMouseEnter: handleMouseEnter,
  evolutionMap,
}) => {
  const navigate = useNavigate();
  const [cartProducts, addToCart, removeFromCart] = useStore((state) => {
    return [state.cartProducts, state.addToCart, state.removeFromCart];
  });

  const productType = determineProductType(product);
  const isAlreadyInCart = cartProducts.some((cartProduct) => {
    return cartProduct.product.name === product.name;
  });
  const iconSize = 'sm';
  const iconColor = ZINC_950;

  const handleClickOnListItem = () => {
    navigate(`/poke-bowl-store/product/${product.name}`, {
      state: {
        product,
        productType,
        evolutionMap,
      },
    });
  };

  const handleClickOnAddToCart = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isAlreadyInCart) {
      removeFromCart(
        cartProducts.findIndex((cartProduct) => {
          return cartProduct.product.name === product.name;
        })
      );
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <li
      className='flex flex-col justify-center items-center p-2 border border-zinc-100 cursor-pointer'
      onClick={handleClickOnListItem}
      onMouseEnter={handleMouseEnter}
    >
      <ImageCarrousel
        size='sm'
        imageUrls={product.sprites}
        productType={productType}
      />
      <div className='w-[100%] flex-col items-start'>
        <div className='w-[100%] flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <p className={'text-xl font-nunito text-zinc-950'}>
              {product.name}
            </p>
            <p className={'text-md font-nunito text-zinc-950'}>
              {product.price && (
                <span className='text-sm font-nunito text-zinc-950'>US$</span>
              )}
              <b className='ml-1'>{`${
                product.price ? toPriceString(product.price) : 'Not for sale'
              }`}</b>
            </p>
          </div>
          {product.price && (
            <button
              type='button'
              className='w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-zinc-100 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500'
              onClick={handleClickOnAddToCart}
            >
              {isAlreadyInCart ? (
                <FontAwesomeIcon
                  icon={faMinus}
                  size={iconSize}
                  color={iconColor}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlus}
                  size={iconSize}
                  color={iconColor}
                />
              )}
            </button>
          )}
        </div>
        {productType === 'pokemon' && (
          <ul className='flex flex-row justify-end'>
            {(product as Pokemon).types.map((type) => {
              return (
                <li
                  key={type}
                  style={{ backgroundColor: determinePokemonTypeColor(type) }}
                  className='ml-1 px-2 py-1 text-xs text-zinc-50 font-nunito font-bold rounded-lg'
                >
                  {type.toUpperCase()}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

const Memo = memo(GridItem);
export default Memo;
