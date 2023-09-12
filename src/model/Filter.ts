type FilteringComponent =
  | 'checkbox-group'
  | 'number-input'
  | 'range-input'
  | 'text-input'
  | 'select';

interface FilterBase {
  filterName: string;
}

interface MultipleOptionsFilter extends FilterBase {
  possibleValues: Array<string>;
}

interface RangeInputFilter extends FilterBase {
  lowerLimitInputName: string;
  upperLimitInputName: string;
  filteringComponent: 'range-input';
}

interface SelectFilter extends MultipleOptionsFilter {
  filteringComponent: 'select';
}

interface CheckboxGroupFilter extends MultipleOptionsFilter {
  filteringComponent: 'checkbox-group';
  maxChecks: number;
}

interface SingleOptionFilter extends FilterBase {
  filteringComponent: Exclude<
    FilteringComponent,
    'checkbox-group' | 'select' | 'range-input'
  >;
}

export type Filter =
  | RangeInputFilter
  | SelectFilter
  | CheckboxGroupFilter
  | SingleOptionFilter;

export interface FilterGroup {
  groupName: string;
  filters: Array<Filter>;
}

export type FilterValue = Array<string> | string | number;
