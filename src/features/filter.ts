import { Status } from '../types/Status';

const INITIAL_STATE = { query: '', status: 'all' };

type SetQuery = { type: 'query/SET', payload: string };
type SetStatus = { type: 'all/SET', payload: string };

const setStatus = (status: Status):
SetStatus => ({ type: 'all/SET', payload: status });
const setQuery = (query: string):
SetQuery => ({ type: 'query/SET', payload: query });

export const actions = { setQuery, setStatus };
type ActionFilter = SetQuery | SetStatus;

const filterReducer = (state = INITIAL_STATE, action: ActionFilter) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };
    case 'all/SET':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
