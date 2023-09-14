import { FC, FormEvent, useEffect, useState } from 'react';
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
import { GRADIENT_COLOR_CLASSES } from '../../../constants/tailwindClasses';
import { Filter, FilterGroup, FilterValue } from '../../../model/Filter';
import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';
import CheckboxGroup from '../../CheckboxGroup/CheckboxGroup';
import ListItem from '../../ListItem/ListItem';
import RangeInput from '../../RangeInput/RangeInput';
import Select from '../../Select/Select';
import TypeableInput from '../../TypeableInput/TypeableInput';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const [productType, setProductType] = useState<ProductType>('pokemon');
  const [filtersValues, setFiltersValues] = useState<
    Record<string, FilterValue>
  >({});
  const [isFilterSectionShowing, setIsFilterSectionShowing] =
    useState<boolean>(true);

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

  const { data: filters, isLoading: areFiltersLoading } = useQuery({
    queryKey: ['filters'],
    queryFn: () => {
      return getFilters() as Promise<{
        pokemon: Array<FilterGroup>;
        item: Array<FilterGroup>;
      }>;
    },
  });

  const buttonClasses = 'text-xl font-bold font-nunito';
  const selectedButtonClasses = `${buttonClasses} from-cyan-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent`;
  const unselectedButtonClasses = `${buttonClasses} text-zing-950`;
  const formButtonClasses = `w-[75px] h-[30px] flex justify-center align-center bg-zinc-100 rounded-lg hover:bg-gradient-to-r ${GRADIENT_COLOR_CLASSES}`;
  const isSomethingLoading = areFiltersLoading;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChangeOnCheckboxGroup = (
    value: string,
    filterName: string,
    maxChecks: number
  ) => {
    if (!filtersValues[filterName]) {
      setFiltersValues({ ...filtersValues, [filterName]: [value] });
    } else if ((filtersValues[filterName] as Array<string>).includes(value)) {
      if ((filtersValues[filterName] as Array<string>).length === 1) {
        if ((filtersValues[filterName] as Array<string>)[0] === value) {
          const filtersValuesCopy = { ...filtersValues };
          delete filtersValuesCopy[filterName];
          setFiltersValues(filtersValuesCopy);
        }
      } else if ((filtersValues[filterName] as Array<string>).length > 1) {
        setFiltersValues({
          ...filtersValues,
          [filterName]: (filtersValues[filterName] as Array<string>).filter(
            (opc) => opc !== value
          ),
        });
      }
    } else {
      if ((filtersValues[filterName] as Array<string>).length < maxChecks) {
        setFiltersValues({
          ...filtersValues,
          [filterName]: [
            ...(filtersValues[filterName] as Array<string>),
            value,
          ],
        });
      }
    }
  };

  const handleChangeOnInputOrSelect = (
    value: string,
    filterName: string,
    isNumberInput: boolean = false
  ) => {
    if (value === '' || value === 'None') {
      const filtersValuesCopy = { ...filtersValues };
      delete filtersValuesCopy[filterName];
      setFiltersValues(filtersValuesCopy);
    } else {
      setFiltersValues({
        ...filtersValues,
        [filterName]: isNumberInput ? parseInt(value) : value,
      });
    }
  };

  const handleClickOnFiltersButton = () => {
    setIsFilterSectionShowing((prev) => !prev);
  };

  useEffect(() => {
    setFiltersValues({});
  }, [productType]);

  return (
    <>
      {isSomethingLoading ? (
        <ClipLoader
          color={ZINC_300}
          size={150}
        />
      ) : (
        <div
          className='w-[100%] flex flex-col gap-4 items-start'
          onSubmit={handleSubmit}
        >
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
            {`${isFilterSectionShowing ? 'Hide' : 'Show'} filters`}
            {isFilterSectionShowing ? (
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
            <form className='p-2 flex flex-col gap-2 items-start sm:w-[250px] sm:border sm:border-zinc-100'>
              {filters &&
                isFilterSectionShowing &&
                filters[productType].map((filterGroup) => {
                  return (
                    <fieldset
                      key={filterGroup.groupName}
                      className='w-[100%] flex flex-col items-start gap-2 border-t border-zinc-100'
                    >
                      <legend className='text-lg font-nunito font-bold'>
                        {filterGroup.groupName}
                      </legend>
                      {filterGroup.filters.map((filter) => {
                        switch (filter.filteringComponent) {
                          case 'checkbox-group':
                            return (
                              <CheckboxGroup
                                legend={
                                  filter.possibleValues.length > 1
                                    ? filter.filterName
                                    : undefined
                                }
                                options={filter.possibleValues}
                                value={
                                  (filtersValues[
                                    filter.filterName
                                  ] as Array<string>) ?? []
                                }
                                onChange={(value) => {
                                  handleChangeOnCheckboxGroup(
                                    value,
                                    filter.filterName,
                                    filter.maxChecks
                                  );
                                }}
                              />
                            );
                          case 'number-input':
                            return (
                              <TypeableInput
                                type='number'
                                id={filter.filterName}
                                name={filter.filterName}
                                label={filter.filterName}
                                isLabelHidden={false}
                                placeholder={filter.filterName}
                                size='md'
                                value={
                                  (filtersValues[
                                    filter.filterName
                                  ] as string) ?? ''
                                }
                                onChange={(e) =>
                                  handleChangeOnInputOrSelect(
                                    e.target.value,
                                    filter.filterName,
                                    true
                                  )
                                }
                              />
                            );
                          case 'range-input':
                            return (
                              <RangeInput
                                legend={filter.filterName}
                                areIndividualLabelsHidden
                                lowerLimitInput={{
                                  id: filter.lowerLimitInputName,
                                  name: filter.lowerLimitInputName,
                                  label: filter.lowerLimitInputName,
                                  placeholder: filter.lowerLimitInputName,
                                  value:
                                    (filtersValues[
                                      filter.lowerLimitInputName
                                    ] as string) ?? '',
                                  onChange: (e) =>
                                    handleChangeOnInputOrSelect(
                                      e.target.value,
                                      filter.lowerLimitInputName,
                                      true
                                    ),
                                }}
                                upperLimitInput={{
                                  id: filter.upperLimitInputName,
                                  name: filter.upperLimitInputName,
                                  label: filter.upperLimitInputName,
                                  placeholder: filter.upperLimitInputName,
                                  value:
                                    (filtersValues[
                                      filter.upperLimitInputName
                                    ] as string) ?? '',
                                  onChange: (e) =>
                                    handleChangeOnInputOrSelect(
                                      e.target.value,
                                      filter.upperLimitInputName,
                                      true
                                    ),
                                }}
                              />
                            );
                          case 'text-input':
                            return (
                              <TypeableInput
                                type='text'
                                id={filter.filterName}
                                name={filter.filterName}
                                label={filter.filterName}
                                isLabelHidden={false}
                                placeholder={filter.filterName}
                                size='md'
                                value={
                                  (filtersValues[
                                    filter.filterName
                                  ] as string) ?? ''
                                }
                                onChange={(e) =>
                                  handleChangeOnInputOrSelect(
                                    e.target.value,
                                    filter.filterName
                                  )
                                }
                              />
                            );
                          case 'select':
                            return (
                              <Select
                                id={filter.filterName}
                                label={filter.filterName}
                                isLabelHidden={false}
                                options={filter.possibleValues}
                                isNoneOptionAllowed
                                value={
                                  (filtersValues[
                                    filter.filterName
                                  ] as string) ?? ''
                                }
                                onChange={(value) =>
                                  handleChangeOnInputOrSelect(
                                    value,
                                    filter.filterName
                                  )
                                }
                              />
                            );
                          default:
                            throw Error(
                              `Unknown filtering component [${
                                (filter as Filter).filteringComponent
                              }]. Maybe the filters endpoint is returning something you are not handling correctly here.`
                            );
                        }
                      })}
                    </fieldset>
                  );
                })}
            </form>
            <ul className='flex-1 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5'>
              {pokemons?.map((pokemon) => {
                return (
                  <ListItem
                    key={pokemon.id}
                    product={pokemon}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
