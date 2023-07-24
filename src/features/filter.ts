import { Filters } from '../types/Filters';

const enum ActionsType {
  SET_QUERY = 'Todos/SET_QUERY',
  SET_FILTER = 'Todos/SET_FILTER',
}

type TodoQuery = {
  type: ActionsType.SET_QUERY,
  payload: string,
};

type TodoFilter = {
  type: ActionsType.SET_FILTER,
  payload: Filters
};

const setQuery = (query: string): TodoQuery => ({
  type: ActionsType.SET_QUERY,
  payload: query,
});

const setFilter = (filter: Filters): TodoFilter => ({
  type: ActionsType.SET_FILTER,
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
    case ActionsType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case ActionsType.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
