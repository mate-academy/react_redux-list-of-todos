import { Status } from '../types/Status';

type StatusFilterAction = { type: 'filter/SET_STATUS', payload: Status };
type QueryFilterAction = { type: 'filter/SET_QUERY', payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };
type Action = StatusFilterAction | QueryFilterAction | ClearQueryAction;

const setStatusFilter = (status: Status): StatusFilterAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});
const setQueryFilter = (query: string): QueryFilterAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});
const ClearQuery = (): ClearQueryAction => ({ type: 'filter/CLEAR_QUERY' });

export const actions = { setQueryFilter, setStatusFilter, ClearQuery };

type State = { query: string, status: Status };

const initialState: State = { query: '', status: 'all' };

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
