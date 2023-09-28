import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { BeatLoader } from 'react-spinners';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

import {
  getFilters,
  getItems,
  getPokemons,
} from '../../../axios/axiosRequestSenders';
import { CYAN_400, ZINC_950 } from '../../../constants/colors';
import { FilterDefinitionGroup, FilterValue } from '../../../model/Filter';
import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';
import { useStore } from '../../../zustand/store';

import FilterSection from './FilterSection/FilterSection';
import Grid from './Grid/Grid';
import { useProductsPageFiltering } from './useProductsPageFiltering';
import { useProductsPagePagination } from './useProductsPagePagination';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const [productType, setProductType] = useState<ProductType>(
    (localStorage.getItem('productType') as ProductType) ?? 'pokemon'
  );
  const [isFilterSectionCollapsed, setIsFilterSectionCollapsed] =
    useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>(
    localStorage.getItem('filterValues')
      ? (JSON.parse(localStorage.getItem('filterValues')!) as Record<
          string,
          FilterValue
        >)
      : {}
  );

  const { data: pokemons, isLoading: arePokemonsLoading } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => {
      return getPokemons() as Promise<Array<Pokemon>>;
    },
  });
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
  const [secondsCount, decrementSecondsCount] = useStore((state) => {
    return [state.secondsCount, state.decrementSecondsCount];
  });

  const isSomethingLoading =
    areFiltersLoading || arePokemonsLoading || areItemsLoading;
  let products: Array<Pokemon> | Array<Item> = [];
  if (!isSomethingLoading) {
    if (productType === 'pokemon') {
      products = pokemons!;
    } else if (productType === 'item') {
      products = items!;
    }
  }

  const { filteredProducts } = useProductsPageFiltering(
    products,
    productType,
    filterValues
  );
  const {
    paginatedProducts,
    pageCount,
    forcePage,
    handleClickOnPage,
    setResultsOffset,
  } = useProductsPagePagination(filteredProducts);

  const buttonTextClasses = 'text-xl font-bold font-nunito';
  const selectedButtonClasses = `${buttonTextClasses} from-cyan-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent`;
  const unselectedButtonClasses = `${buttonTextClasses} text-zinc-950`;
  const paginationButtonClasses = `p-2 text-sm font-light font-nunito sm:text-xl sm:font-nunito sm:px-2 sm:py-1 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg`;

  const handleClickOnFiltersButton = () => {
    setIsFilterSectionCollapsed((prev) => !prev);
  };

  const handleClickOnProductTypeButton = (type: ProductType) => {
    setProductType(type);
    setFilterValues({});
    setResultsOffset(0);
    localStorage.setItem('resultsOffset', '0');
  };

  useEffect(() => {
    localStorage.setItem('productType', productType);
    localStorage.setItem('filterValues', JSON.stringify(filterValues));
  }, [productType, filterValues]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (secondsCount > 0) {
        decrementSecondsCount();
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [secondsCount]);

  return (
    <>
      {isSomethingLoading || secondsCount !== 0 ? (
        <div className='w-full h-[87.5vh] flex justify-center items-center'>
          <div className='p-4 flex flex-col gap-2 items-center rounded-lg bg-zinc-100'>
            <BeatLoader
              color={CYAN_400}
              size={20}
            />
            <p className='text-lg font-nunito font-bold'>
              Loading products ({secondsCount}s)
            </p>
          </div>
        </div>
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
              onClick={() => handleClickOnProductTypeButton('pokemon')}
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
              onClick={() => handleClickOnProductTypeButton('item')}
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
          <div className='w-[100%] flex flex-col gap-2 sm:flex-row'>
            {!isFilterSectionCollapsed && (
              <FilterSection
                filterDefinitionGroups={filterDefinitionGroups![productType]}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setResultsOffset={setResultsOffset}
              />
            )}
            <div className='flex-1'>
              <Grid
                displayProducts={paginatedProducts}
                allProducts={products}
              />
            </div>
          </div>
          <ReactPaginate
            className=' self-center px-2 py-5 flex flex-row gap-1 justify-center'
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
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={forcePage}
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
