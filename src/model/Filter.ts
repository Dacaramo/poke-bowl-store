type FilteringComponent =
  | 'checkbox-group'
  | 'number-input'
  | 'range-input'
  | 'text-input'
  | 'select';

interface FilterDefinitionBase {
  filterName: string;
}

interface MultipleOptionsFilterDefinition extends FilterDefinitionBase {
  possibleValues: Array<string>;
}

interface RangeInputFilterDefinition extends FilterDefinitionBase {
  lowerLimitInputName: string;
  upperLimitInputName: string;
  filteringComponent: 'range-input';
}

interface SelectFilterDefinition extends MultipleOptionsFilterDefinition {
  filteringComponent: 'select';
}

interface CheckboxGroupFilterDefinition
  extends MultipleOptionsFilterDefinition {
  filteringComponent: 'checkbox-group';
  maxChecks: number;
}

interface SingleOptionFilterDefinition extends FilterDefinitionBase {
  filteringComponent: Exclude<
    FilteringComponent,
    'checkbox-group' | 'select' | 'range-input'
  >;
}

export type FilterDefinition =
  | RangeInputFilterDefinition
  | SelectFilterDefinition
  | CheckboxGroupFilterDefinition
  | SingleOptionFilterDefinition;

export interface FilterDefinitionGroup {
  groupName: string;
  definitions: Array<FilterDefinition>;
}

export type FilterValue = Array<string> | string | number;
