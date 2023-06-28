import { Filters } from '../types/Filters';

const SET_QUERY = 'Todos/SET_QUERY';
const SET_FILTER = 'Todos/SET_FILTER';

type TodoQuery = {
  type: typeof SET_QUERY;
  payload: string,
};

type TodoFilter = {
  type: typeof SET_FILTER;
  payload: Filters
};

const setQuery = (query: string): TodoQuery => ({
  type: SET_QUERY,
  payload: query,
});

const setFilter = (filter: Filters): TodoFilter => ({
  type: SET_FILTER,
  payload: filter,
});

export const actions = { setQuery, setFilter };

type Action = TodoQuery | TodoFilter;

interface FilterState {
  query: string;
  filter: Filters;
}

const initialState: FilterState = {
  query: '',
  filter: Filters.All,

};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
