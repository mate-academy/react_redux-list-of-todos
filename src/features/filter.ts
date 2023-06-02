import { Status } from '../types/Status';

type SetFilter = { type: 'setFilter', payload: Status };

type SetQuery = { type: 'setQuery', payload: string };

type StateFilter = { query: string, status: Status };

type Action = SetFilter | SetQuery;

const setFilterType = (status: Status) => (
  { type: 'setFilter', payload: status }
);

const setQuery = (query: string) => (
  { type: 'setQuery', payload: query }
);

const startValue: StateFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: StateFilter = startValue,
  action: Action,
): StateFilter => {
  switch (action.type) {
    case 'setFilter':
      return {
        ...state,
        status: action.payload,
      };

    case 'setQuery':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
export const actions = { setQuery, setFilterType };
