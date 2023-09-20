import { Dispatch, FC, SetStateAction } from 'react';

import {
  FilterDefinition,
  FilterDefinitionGroup,
  FilterValue,
} from '../../../../model/Filter';
import CheckboxGroup from '../../../CheckboxGroup/CheckboxGroup';
import RangeInput from '../../../RangeInput/RangeInput';
import Select from '../../../Select/Select';
import TypeableInput from '../../../TypeableInput/TypeableInput';

import { useFilterSectionHandlers } from './useFilterSectionHandlers';

interface Props {
  filterDefinitionGroups: Array<FilterDefinitionGroup>;
  filterValues: Record<string, FilterValue>;
  setFilterValues: Dispatch<SetStateAction<Record<string, FilterValue>>>;
}

const FilterSection: FC<Props> = ({
  filterDefinitionGroups,
  filterValues,
  setFilterValues,
}) => {
  const {
    handleChangeOnCheckboxGroup,
    handleChangeOnInputOrSelect,
    handleClickOnResetFilters,
  } = useFilterSectionHandlers(filterValues, setFilterValues);

  return (
    <form className='p-2 flex flex-col gap-2 items-start sm:w-[250px] sm:border sm:border-zinc-100'>
      {filterDefinitionGroups.map((filterGroup, i) => {
        return (
          <fieldset
            key={filterGroup.groupName}
            className='w-[100%] p-1 flex flex-col items-start gap-2 border-t border-zinc-100'
          >
            <legend className='text-lg font-nunito font-bold'>
              {filterGroup.groupName}
            </legend>
            {filterGroup.definitions.map((definition) => {
              switch (definition.filteringComponent) {
                case 'checkbox-group':
                  return (
                    <CheckboxGroup
                      key={definition.filterName}
                      legend={
                        definition.possibleValues.length > 1
                          ? definition.filterName
                          : undefined
                      }
                      options={definition.possibleValues}
                      value={
                        (filterValues[
                          definition.filterName
                        ] as Array<string>) ?? []
                      }
                      onChange={(value) => {
                        handleChangeOnCheckboxGroup(
                          value,
                          definition.filterName,
                          definition.maxChecks
                        );
                      }}
                    />
                  );
                case 'number-input':
                  return (
                    <TypeableInput
                      key={definition.filterName}
                      type='number'
                      id={definition.filterName}
                      name={definition.filterName}
                      label={definition.filterName}
                      isLabelHidden={false}
                      placeholder={definition.filterName}
                      size='md'
                      value={
                        (filterValues[definition.filterName] as string) ?? ''
                      }
                      onChange={(e) =>
                        handleChangeOnInputOrSelect(
                          e.target.value,
                          definition.filterName,
                          true
                        )
                      }
                    />
                  );
                case 'range-input':
                  return (
                    <RangeInput
                      key={definition.filterName}
                      legend={definition.filterName}
                      areIndividualLabelsHidden
                      lowerLimitInput={{
                        id: definition.lowerLimitInputName,
                        name: definition.lowerLimitInputName,
                        label: definition.lowerLimitInputName,
                        placeholder: definition.lowerLimitInputName,
                        value:
                          (filterValues[
                            definition.lowerLimitInputName
                          ] as string) ?? '',
                        onChange: (e) =>
                          handleChangeOnInputOrSelect(
                            e.target.value,
                            definition.lowerLimitInputName,
                            true
                          ),
                      }}
                      upperLimitInput={{
                        id: definition.upperLimitInputName,
                        name: definition.upperLimitInputName,
                        label: definition.upperLimitInputName,
                        placeholder: definition.upperLimitInputName,
                        value:
                          (filterValues[
                            definition.upperLimitInputName
                          ] as string) ?? '',
                        onChange: (e) =>
                          handleChangeOnInputOrSelect(
                            e.target.value,
                            definition.upperLimitInputName,
                            true
                          ),
                      }}
                    />
                  );
                case 'text-input':
                  return (
                    <TypeableInput
                      key={definition.filterName}
                      type='text'
                      id={definition.filterName}
                      name={definition.filterName}
                      label={definition.filterName}
                      isLabelHidden={false}
                      placeholder={definition.filterName}
                      size='md'
                      value={
                        (filterValues[definition.filterName] as string) ?? ''
                      }
                      onChange={(e) =>
                        handleChangeOnInputOrSelect(
                          e.target.value,
                          definition.filterName
                        )
                      }
                    />
                  );
                case 'select':
                  return (
                    <Select
                      key={definition.filterName}
                      id={definition.filterName}
                      label={definition.filterName}
                      isLabelHidden={false}
                      options={definition.possibleValues}
                      isNoneOptionAllowed
                      value={
                        (filterValues[definition.filterName] as string) ?? ''
                      }
                      onChange={(value) =>
                        handleChangeOnInputOrSelect(
                          value,
                          definition.filterName
                        )
                      }
                    />
                  );
                default:
                  throw Error(
                    `Unknown filtering component [${
                      (definition as FilterDefinition).filteringComponent
                    }]. Maybe the filterDefinitionGroups endpoint is returning something you are not handling correctly here.`
                  );
              }
            })}
          </fieldset>
        );
      })}
      <div className='w-[100%] h-[1px] border-b border-zinc-100' />
      <button
        type='button'
        className='self-end w-[100%] px-2 py-1 rounded-lg text-md font-bold font-nunito bg-zinc-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500'
        onClick={handleClickOnResetFilters}
      >
        Reset filters
      </button>
    </form>
  );
};

export default FilterSection;
