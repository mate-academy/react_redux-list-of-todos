import { Status } from '../types/Status';

type SetFilter = { type: 'setFilter'; payload: Status; };
type SetQuerry = { type: 'setQuery'; payload: string; };

export type StateFilter = { query: string; status: Status };
type Action = SetFilter | SetQuerry;

const setFilter = (status: Status) => ({ type: 'setFilter', payload: status });
const setQuery = (query: string) => ({ type: 'setQuery', payload: query });

export const actions = { setFilter, setQuery };

const startFilter: StateFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: StateFilter = startFilter,
  actionFilter: Action,
): StateFilter => {
  const action: SetFilter | SetQuerry = actionFilter;

  switch (action.type) {
    case 'setQuery':
      return {
        ...state,
        query: action.payload,
      };
    case 'setFilter':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
