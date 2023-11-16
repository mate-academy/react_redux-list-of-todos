import { FiltersType } from 'types/Filters';
import { CompletionStatus } from 'types/CompletionStatus.enum';

type SetQueryAction = {
  type: 'filter/SET-QUERY'
  payload: string
};

type ClearQuery = {
  type: 'filter/CLEAR-QUERY'
};

type SelectFilter = {
  type: 'filter/SELECT-COMPLETION-STATUS',
  payload: CompletionStatus,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET-QUERY',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'filter/CLEAR-QUERY',
});

const selectFilter = (filter: CompletionStatus): SelectFilter => ({
  type: 'filter/SELECT-COMPLETION-STATUS',
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
  filter: CompletionStatus.All,
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

    case 'filter/SELECT-COMPLETION-STATUS':
      return ({
        ...filters,
        filter: action.payload,
      });

    default:
      return filters;
  }
};

export default filterReducer;
