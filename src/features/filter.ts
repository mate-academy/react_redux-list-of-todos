import { Action as BaseAction } from 'redux';
import { FilterTypes } from '../types/FilterTypes';

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum FilterActionsTypes {
  SetQuery = 'filter/set_query',
  SetFilter = 'filter/set_filter',
}

export type SetQueryType = Action<FilterActionsTypes.SetQuery, string>;
export type SetFilterType = Action<FilterActionsTypes.SetFilter, string>;

type FilterActions = SetQueryType | SetFilterType;

const setQuery = (query: string) => ({
  type: FilterActionsTypes.SetQuery,
  payload: query,
});

const setFilter = (filter: FilterTypes) => ({
  type: FilterActionsTypes.SetFilter,
  payload: filter,
});

export const FILTERS_ACTIONS_CREATOR = {
  setQuery,
  setFilter,
};

export interface StateFilter {
  query: string,
  status: FilterTypes,
}

const initialState = {
  query: '',
  status: FilterTypes.All,
};

// що повертає функція? Як типизувати? State?
const filterReducer = (
  state: StateFilter = initialState,
  action: FilterActions,
) => {
  switch (action.type) {
    case FilterActionsTypes.SetQuery:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActionsTypes.SetFilter:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
