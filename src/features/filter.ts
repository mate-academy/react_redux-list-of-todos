import { SortType } from '../types/Status';

type SetVisibilityFilter = { type: 'filter/SORTTYPE'; payload: SortType };
type SetQuery = { type: 'filter/QUERY'; payload: string };

type Action = SetVisibilityFilter | SetQuery;
type State = { query: string; status: SortType };

const setFilter = (payload:SortType):SetVisibilityFilter => ({
  type: 'filter/SORTTYPE',
  payload,
});

const setQuery = (payload:string):SetQuery => ({
  type: 'filter/QUERY',
  payload,
});

const initialState: State = {
  query: '',
  status: SortType.ALL,
};

const filterReducer = (
  state: State = initialState,
  action:Action,
): State => {
  switch (action.type) {
    case 'filter/SORTTYPE':
      return { ...state, status: action.payload };

    case 'filter/QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = {
  setFilter, setQuery,
};

export default filterReducer;
