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
  const { handleChangeOnCheckboxGroup, handleChangeOnInputOrSelect } =
    useFilterSectionHandlers(filterValues, setFilterValues);

  return (
    <form className='p-2 flex flex-col gap-2 items-start sm:w-[250px] sm:border sm:border-zinc-100'>
      {filterDefinitionGroups.map((filterGroup) => {
        return (
          <fieldset
            key={filterGroup.groupName}
            className='w-[100%] flex flex-col items-start gap-2 border-t border-zinc-100'
          >
            <legend className='text-lg font-nunito font-bold'>
              {filterGroup.groupName}
            </legend>
            {filterGroup.definitions.map((definition) => {
              switch (definition.filteringComponent) {
                case 'checkbox-group':
                  return (
                    <CheckboxGroup
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
    </form>
  );
};

export default FilterSection;
