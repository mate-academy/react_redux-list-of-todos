import { FilterOptions } from '../types/Filter';

type QueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type FilterAction = {
  type: 'filter/TYPE',
  payload: string,
};

type Action = QueryAction | FilterAction;

export const setQueryAction = ((query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
}));

export const setFilterType = ((type: string): FilterAction => ({
  type: 'filter/TYPE',
  payload: type,
}));

export const actions = { setQueryAction, setFilterType };

const FilterStatus: string = FilterOptions.All;

const todoFilter = {
  query: '',
  status: FilterStatus,
};

const filterReducer = (state = todoFilter, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/TYPE':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default filterReducer;
