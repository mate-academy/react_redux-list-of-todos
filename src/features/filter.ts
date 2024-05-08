import { Status } from '../types/Status';

type SetFilter = {
  type: 'filter/setFilter';
  payload: Status;
};

type SetQuery = {
  type: 'filter/setQuery';
  payload: string;
};

const setFilter = (filter: Status) => ({
  type: 'filter/setFilter',
  payload: filter,
});

const setQuery = (query: string) => ({
  type: 'filter/setQuery',
  payload: query,
});

export const actions = {
  setFilter,
  setQuery,
};

const initialState = {
  query: '',
  filter: Status.All,
};

type Action = SetFilter | SetQuery;

/* eslint-disable-next-line */
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/setQuery':
      return { ...state, query: action.payload };

    case 'filter/setFilter':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
