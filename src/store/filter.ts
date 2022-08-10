import {
  ActiveFilterAction,
  AllFilterAction,
  CompletedFilterAction,
  SetQueryFilterAction,
  FilterAction,
  FilterState,
} from '../types/Redux/Filter';
import { SortedType } from '../types/SortType';

const initialFilters: FilterState = {
  query: '',
  completingState: SortedType.all,
};

export const filterReducer = (
  filter: FilterState = initialFilters,
  action: FilterAction,
  payload?: string,
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
      if (!payload) {
        return filter;
      }

      return {
        ...filter,
        query: payload,
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
};
