import { FC } from 'react';

import { Product } from '../../../../model/Product';

import GridItem from './GridItem/GridItem';

interface Props {
  products: Array<Product>;
}

const Grid: FC<Props> = ({ products }) => {
  return (
    <ul className='flex-1 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5'>
      {products?.map((product) => {
        return (
          <GridItem
            key={product.id}
            product={product}
          />
        );
      })}
    </ul>
  );
};

export default Grid;
