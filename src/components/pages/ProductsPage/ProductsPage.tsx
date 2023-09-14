import { FC, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

import {
  getFilters,
  getItems,
  getPokemons,
} from '../../../axios/axiosRequestSenders';
import { ZINC_300, ZINC_950 } from '../../../constants/colors';
import { FilterDefinitionGroup, FilterValue } from '../../../model/Filter';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';
import List from '../../List/List';

import FilterSection from './FilterSection/FilterSection';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const [productType, setProductType] = useState<ProductType>('pokemon');
  const [isFilterSectionCollapsed, setIsFilterSectionCollapsed] =
    useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>(
    {}
  );

  const { data: pokemons, isLoading: arePokemonsLoading } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => {
      return getPokemons() as Promise<Array<Pokemon>>;
    },
  });

  /*
   * Const { data: items, isLoading: areItemsLoading } = useQuery({
   *   queryKey: ['items'],
   *   queryFn: () => {
   *     return getItems() as Promise<Array<Item>>;
   *   },
   * });
   */

  const { data: filterDefinitionGroups, isLoading: areFiltersLoading } =
    useQuery({
      queryKey: ['filters'],
      queryFn: () => {
        return getFilters() as Promise<{
          pokemon: Array<FilterDefinitionGroup>;
          item: Array<FilterDefinitionGroup>;
        }>;
      },
    });

  const buttonClasses = 'text-xl font-bold font-nunito';
  const selectedButtonClasses = `${buttonClasses} from-cyan-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent`;
  const unselectedButtonClasses = `${buttonClasses} text-zing-950`;
  const isSomethingLoading = areFiltersLoading || arePokemonsLoading;

  const handleClickOnFiltersButton = () => {
    setIsFilterSectionCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setFilterValues({});
  }, [productType]);

  return (
    <>
      {isSomethingLoading ? (
        <ClipLoader
          color={ZINC_300}
          size={150}
        />
      ) : (
        <div className='w-[100%] flex flex-col gap-4 items-start'>
          <div className='self-center flex flex-row gap-4'>
            <button
              type='button'
              className={`${
                productType === 'pokemon'
                  ? selectedButtonClasses
                  : unselectedButtonClasses
              }`}
              onClick={() => setProductType('pokemon')}
            >
              Pokemons
            </button>
            <button
              type='button'
              className={`${
                productType === 'item'
                  ? selectedButtonClasses
                  : unselectedButtonClasses
              }`}
              onClick={() => setProductType('item')}
            >
              Items
            </button>
          </div>
          <button
            type='button'
            className='self-center flex flex-row items-center text-md font-nunito font-light sm:hidden'
            onClick={handleClickOnFiltersButton}
          >
            {`${isFilterSectionCollapsed ? 'Show' : 'Hide'} filters`}
            {isFilterSectionCollapsed ? (
              <FontAwesomeIcon
                className='ml-2'
                icon={faCaretUp}
                size='sm'
                color={ZINC_950}
              />
            ) : (
              <FontAwesomeIcon
                className='ml-2'
                icon={faCaretDown}
                size='sm'
                color={ZINC_950}
              />
            )}
          </button>
          <div className='w-[100%] flex flex-row gap-2'>
            {!isFilterSectionCollapsed && (
              <FilterSection
                filterDefinitionGroups={filterDefinitionGroups![productType]}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
              />
            )}
            <List
              products={productType === 'pokemon' ? pokemons! : pokemons!}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
