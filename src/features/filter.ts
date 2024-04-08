/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
import { Status } from '../types/Status';

type setQueryAction = { type: 'query/SET'; payload: string };
type removeQueryAction = { type: 'query/REMOVE'; payload: '' };
type StatusAction = { type: 'status/SET'; payload: Status };
type Action = StatusAction | setQueryAction | removeQueryAction;
type State = { query: string; status: Status };

const initState: State = { query: '', status: Status.All };

const setQuery = (query: string): setQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const removeQuery = (): removeQueryAction => ({
  type: 'query/REMOVE',
  payload: '',
});

const setStatus = (status: Status): StatusAction => ({
  type: 'status/SET',
  payload: status,
});

const filterReducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case 'query/SET':
    case 'query/REMOVE':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return initState;
  }
};

export const actions = { setQuery, removeQuery, setStatus };

export default filterReducer;
