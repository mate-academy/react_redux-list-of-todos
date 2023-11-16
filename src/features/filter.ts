import { FiltersType } from 'types/Filters';
import { Filters } from 'types/Filters.enum';

type SetQueryAction = {
  type: 'filter/SET-QUERY'
  payload: string
};

type ClearQuery = {
  type: 'filter/CLEAR-QUERY'
};

type SelectFilter = {
  type: 'filter/SELECT-FILTER',
  payload: Filters,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET-QUERY',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'filter/CLEAR-QUERY',
});

const selectFilter = (filter: Filters): SelectFilter => ({
  type: 'filter/SELECT-FILTER',
  payload: filter,
});

export const actions = {
  setQuery,
  clearQuery,
  selectFilter,
};

type Action = SetQueryAction | ClearQuery | SelectFilter;

const initialState: FiltersType = {
  query: '',
  filter: Filters.All,
};

const filterReducer
= (filters: FiltersType = initialState, action: Action): FiltersType => {
  switch (action.type) {
    case 'filter/SET-QUERY':
      return ({
        ...filters,
        query: action.payload,
      });

    case 'filter/CLEAR-QUERY':
      return ({
        ...filters,
        query: '',
      });

    case 'filter/SELECT-FILTER':
      return ({
        ...filters,
        filter: action.payload,
      });

    default:
      return filters;
  }
};

export default filterReducer;
