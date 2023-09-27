import { FC } from 'react';

import { CartProduct, Product } from '../../../../model/Product';

import ListItem from './ListItem/ListItem';

interface Props {
  products: Array<CartProduct<Product>>;
}

const List: FC<Props> = ({ products }) => {
  return (
    <ul className='w-full max-w-[800px] flex flex-col gap-4'>
      {products.map((cartProduct, i) => {
        return (
          <ListItem
            key={cartProduct.product.name}
            cartProduct={cartProduct}
            index={i}
          />
        );
      })}
    </ul>
  );
};

export default List;
