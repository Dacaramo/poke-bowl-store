import { FC } from 'react';

import { Product } from '../../model/Product';
import ListItem from '../ListItem/ListItem';

interface Props {
  products: Array<Product>;
}

const List: FC<Props> = ({ products }) => {
  return (
    <ul className='flex-1 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5'>
      {products?.map((product) => {
        return (
          <ListItem
            key={product.id}
            product={product}
          />
        );
      })}
    </ul>
  );
};

export default List;
