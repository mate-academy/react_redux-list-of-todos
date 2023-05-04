import { Status } from '../types/Status';
import { ActionFilter } from '../types/ActionFilter';

type SetFilter = { type: 'setFilter'; payload: Status; };
type SetQuerry = { type: 'setQuery'; payload: string; };

export type StateFilter = { query: string; status: Status };
type Action = SetFilter | SetQuerry;

const setFilter
= (status: Status) => ({ type: ActionFilter.setFilter, payload: status });
const setQuery
= (query: string) => ({ type: ActionFilter.setQuery, payload: query });

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
    case ActionFilter.setQuery:
      return {
        ...state,
        query: action.payload,
      };
    case ActionFilter.setFilter:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
