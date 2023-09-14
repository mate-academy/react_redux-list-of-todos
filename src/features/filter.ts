import { SORT } from '../types/SortEnum';

type QueryAction = { type: 'filter/SET_QUERY'; payload: string };
type SortAction = { type: 'filter/SET_SORT'; payload: SORT };
type ClearAction = { type: 'filter/QUERY_CLEAR' };

type Action = QueryAction | SortAction | ClearAction;

const setQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setSort = (sortField: SORT): SortAction => ({
  type: 'filter/SET_SORT',
  payload: sortField,
});

const clearQuery = (): ClearAction => ({ type: 'filter/QUERY_CLEAR' });

export const actions = {
  setQuery,
  setSort,
  clearQuery,
};

interface FilterState {
  query: string;
  sort: SORT;
}

const initialState: FilterState = {
  query: '',
  sort: SORT.ALL,
};

const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'filter/QUERY_CLEAR':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export default filterReducer;
