import { Status } from '../types/Status';

type SetStatusAction = { type: 'currentStatus/SET', payload: Status };
type SetQueryAction = { type: 'currentQuery/SET', payload: string };
type ClearQueryAction = { type: 'currentQuery/CLEAR' };

const setStatus = (newStatus: Status): SetStatusAction => ({
  type: 'currentStatus/SET',
  payload: newStatus,
});

const setQuery = (newQuery: string): SetQueryAction => ({
  type: 'currentQuery/SET',
  payload: newQuery,
});

const clearQuery = (): ClearQueryAction => ({ type: 'currentQuery/CLEAR' });

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  query: string,
  status: Status,
};

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const defaultState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (
  state: State = defaultState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentStatus/SET':
      return { ...state, status: action.payload };

    case 'currentQuery/SET':
      return { ...state, query: action.payload };

    case 'currentQuery/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
