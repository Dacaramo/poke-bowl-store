import { Dispatch, SetStateAction } from 'react';

import { FilterValue } from '../../../../model/Filter';

interface ReturnedObject {
  handleChangeOnCheckboxGroup: (
    value: string,
    filterName: string,
    maxChecks: number
  ) => void;
  handleChangeOnInputOrSelect: (
    value: string,
    filterName: string,
    isNumberInput?: boolean
  ) => void;
  handleClickOnResetFilters: () => void;
}

export const useFilterSectionHandlers = (
  filterValues: Record<string, FilterValue>,
  setFilterValues: Dispatch<SetStateAction<Record<string, FilterValue>>>
): ReturnedObject => {
  const handleChangeOnCheckboxGroup = (
    value: string,
    filterName: string,
    maxChecks: number
  ) => {
    if (!filterValues[filterName]) {
      setFilterValues({ ...filterValues, [filterName]: [value] });
    } else if ((filterValues[filterName] as Array<string>).includes(value)) {
      if ((filterValues[filterName] as Array<string>).length === 1) {
        if ((filterValues[filterName] as Array<string>)[0] === value) {
          const filterValuesCopy = { ...filterValues };
          delete filterValuesCopy[filterName];
          setFilterValues(filterValuesCopy);
        }
      } else if ((filterValues[filterName] as Array<string>).length > 1) {
        setFilterValues({
          ...filterValues,
          [filterName]: (filterValues[filterName] as Array<string>).filter(
            (opc) => opc !== value
          ),
        });
      }
    } else {
      if ((filterValues[filterName] as Array<string>).length < maxChecks) {
        setFilterValues({
          ...filterValues,
          [filterName]: [...(filterValues[filterName] as Array<string>), value],
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
      const filterValuesCopy = { ...filterValues };
      delete filterValuesCopy[filterName];
      setFilterValues(filterValuesCopy);
    } else {
      setFilterValues({
        ...filterValues,
        [filterName]: isNumberInput ? parseInt(value) : value,
      });
    }
  };

  const handleClickOnResetFilters = () => {
    setFilterValues({});
  };

  return {
    handleChangeOnCheckboxGroup,
    handleChangeOnInputOrSelect,
    handleClickOnResetFilters,
  };
};
