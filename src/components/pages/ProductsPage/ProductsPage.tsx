import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
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
import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';

import FilterSection from './FilterSection/FilterSection';
import Grid from './Grid/Grid';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const [productType, setProductType] = useState<ProductType>('pokemon');
  const [isFilterSectionCollapsed, setIsFilterSectionCollapsed] =
    useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>(
    {}
  );
  const [resultsOffset, setResultsOffset] = useState<number>(0);

  // const { data: pokemons, isLoading: arePokemonsLoading } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => {
  //     return getPokemons() as Promise<Array<Pokemon>>;
  //   },
  // });

  const { data: items, isLoading: areItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      return getItems() as Promise<Array<Item>>;
    },
  });

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

  const buttonTextClasses = 'text-xl font-bold font-nunito';
  const selectedButtonClasses = `${buttonTextClasses} from-cyan-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent`;
  const unselectedButtonClasses = `${buttonTextClasses} text-zinc-950`;
  const paginationButtonClasses = `${buttonTextClasses} px-2 py-1 bg-zinc-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg`;
  const isSomethingLoading = areFiltersLoading || areItemsLoading;
  const products = productType === 'item' ? items : items;
  const resultsPerPage = 30;
  const endOffset = resultsOffset + resultsPerPage;
  const currentResults = items?.slice(resultsOffset, endOffset) ?? [];
  const pageCount = Math.ceil(items?.length ?? 0 / resultsPerPage);

  const handleClickOnFiltersButton = () => {
    setIsFilterSectionCollapsed((prev) => !prev);
  };

  const handleClickOnPage = (event: { selected: number }) => {
    const newOffset = (event.selected * resultsPerPage) % (items?.length ?? 1);
    setResultsOffset(newOffset);
  };

  useEffect(() => {
    setFilterValues({});
  }, [productType]);

  console.log('@@@@@items', items);

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
            <Grid
              products={
                productType === 'pokemon' ? currentResults : currentResults
              }
            />
          </div>
          <ReactPaginate
            className='p-5 self-center flex flex-row gap-2'
            nextLinkClassName={paginationButtonClasses}
            pageLinkClassName={paginationButtonClasses}
            previousLinkClassName={paginationButtonClasses}
            activeLinkClassName={
              'bg-zinc-300 hover:from-zinc-300 hover:to-zinc-300'
            }
            breakClassName='font-nunito text-lg'
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handleClickOnPage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel='Prev'
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
