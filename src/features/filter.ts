import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/STATUS', payload: Status };
type SetQueryAction = { type: 'filter/QUERY', payload: string };
type ResetQueryAction = { type: 'filter/RESET_QUERY' };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS', payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY', payload: query,
});

const resetQuery = (): ResetQueryAction => ({ type: 'filter/RESET_QUERY' });

type Action = SetStatusAction | SetQueryAction | ResetQueryAction;
type State = {
  query: string,
  status: Status
};

export const actions = { setStatus, setQuery, resetQuery };

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      } as State;

    case 'filter/RESET_QUERY':
      return {
        ...state,
        query: '',
      };

    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      } as State;

    default:
      return state;
  }
};

export default filterReducer;
