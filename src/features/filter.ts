import { Status } from '../types/Status';

export type FilterParams = {
  query: string,
  status: Status,
};

type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };
type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type ClearAction = { type: 'filter/CLEAR' };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearFilter = (): ClearAction => ({ type: 'filter/CLEAR' });

export const actions = { setStatus, setQuery, clearFilter };

export type Action = SetStatusAction | SetQueryAction | ClearAction;

const initialFilterParams: FilterParams = { query: '', status: Status.All };

const filterReducer = (
  state: FilterParams = initialFilterParams,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR':
      return {};
    default:
      return state;
  }
};

export default filterReducer;
