import { FilterState } from '../types/FilterState';
import { Sort } from '../types/Sort';

export type NotFilteredAction = {
  type: 'FILTER/NO',
};

export type ActiveFilteredAction = {
  type: 'FILTER/ACTIVE',
};

export type CompletedFilteredAction = {
  type: 'FILTER/COMPLETED',
};

export type SetQueryFilteredAction = {
  type: 'FILTER/QUERY',
  payload: string,
};

export type ClearQueryFilteredAction = {
  type: 'FILTER/CLEAR',
};

export type FilteredActions = (
  NotFilteredAction
  | ActiveFilteredAction
  | CompletedFilteredAction
  | SetQueryFilteredAction
  | ClearQueryFilteredAction
);

const initialState = {
  query: '',
  selection: Sort.all,
};

export const filterReducer = (
  filter: FilterState = initialState,
  action: FilteredActions,
) => {
  switch (action.type) {
    case 'FILTER/ACTIVE':
      return {
        ...filter,
        selection: Sort.active,
      };
    case 'FILTER/COMPLETED':
      return {
        ...filter,
        selection: Sort.completed,
      };
    case 'FILTER/NO':
      return {
        ...filter,
        selection: Sort.all,
      };
    case 'FILTER/QUERY':
      return {
        ...filter,
        query: action.payload,
      };
    case 'FILTER/CLEAR':
      return {
        ...filter,
        query: '',
      };
    default:
      return filter;
  }
};

export const actions = {
  No: (): NotFilteredAction => ({ type: 'FILTER/NO' }),
  Active: (): ActiveFilteredAction => ({ type: 'FILTER/ACTIVE' }),
  Completed: (): CompletedFilteredAction => ({ type: 'FILTER/COMPLETED' }),
  Query: (payload: string): SetQueryFilteredAction => (
    { type: 'FILTER/QUERY', payload }
  ),
  QueryClear: (): ClearQueryFilteredAction => ({ type: 'FILTER/CLEAR' }),
};
