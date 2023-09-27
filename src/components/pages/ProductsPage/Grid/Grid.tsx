import { FC, useState } from 'react';

import { Pokemon } from '../../../../model/Pokemon';
import { Product } from '../../../../model/Product';
import { determineProductType } from '../../../../utils/modelUtils';

import GridItem from './GridItem/GridItem';

interface Props {
  displayProducts: Array<Product>;
  allProducts: Array<Product>;
}

const Grid: FC<Props> = ({ displayProducts, allProducts }) => {
  const [evolutionMap, setEvolutionMap] = useState<
    Record<string, Pokemon> | undefined
  >(undefined);

  const handleMouseEnter = (product: Product) => {
    if (determineProductType(product) === 'pokemon') {
      setEvolutionMap(
        (product as Pokemon).evolutions.reduce(
          (acc: Record<string, Pokemon>, names: Array<string>) => {
            names.forEach((name) => {
              acc = {
                ...acc,
                [name]: (allProducts as Array<Pokemon>).find(
                  (pokemon: Pokemon) => {
                    return pokemon.name === name;
                  }
                ),
              } as Record<string, Pokemon>;
            });
            return acc;
          },
          {} as Record<string, Pokemon>
        )
      );
    }
  };

  return (
    <>
      {displayProducts.length > 0 ? (
        <ul className='flex-1 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] grid-rows-[repeat(auto-fill,minmax(300px,1fr))] gap-5'>
          {displayProducts?.map((product) => {
            return (
              <GridItem
                key={product.id}
                product={product}
                onMouseEnter={() => handleMouseEnter(product)}
                evolutionMap={evolutionMap}
              />
            );
          })}
        </ul>
      ) : (
        <p className='ml-5 font-nunito font-bold text-zinc-950 text-lg'>
          There is no results for your search
        </p>
      )}
    </>
  );
};

export default Grid;
