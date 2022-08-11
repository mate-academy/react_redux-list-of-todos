import {
  ActiveFilterAction,
  AllFilterAction,
  CompletedFilterAction,
  SetQueryFilterAction,
  FilterAction,
  FilterState,
  ClearQueryFilterAction,
} from '../types/Redux/Filter';
import { SortedType } from '../types/SortType';

const initialFilters: FilterState = {
  query: '',
  completingState: SortedType.all,
};

export const filterReducer = (
  filter: FilterState = initialFilters,
  action: FilterAction,
) => {
  switch (action.type) {
    case 'filter/all':
      return {
        ...filter,
        completingState: SortedType.all,
      };

    case 'filter/active':
      return {
        ...filter,
        completingState: SortedType.active,
      };

    case 'filter/completed':
      return {
        ...filter,
        completingState: SortedType.completed,
      };

    case 'filter/setQuery':
      return {
        ...filter,
        query: action.payload,
      };

    case 'filter/clearQuery':
      return {
        ...filter,
        query: '',
      };
    default:
      return filter;
  }
};

export const actions = {
  allFilter: (): AllFilterAction => ({ type: 'filter/all' }),
  activeFilter: (): ActiveFilterAction => ({ type: 'filter/active' }),
  completedFilter: (): CompletedFilterAction => ({ type: 'filter/completed' }),
  setQueryfilter: (payload: string): SetQueryFilterAction => (
    { type: 'filter/setQuery', payload }
  ),
  clearQueryFilter: (): ClearQueryFilterAction => (
    { type: 'filter/clearQuery' }
  ),
};
