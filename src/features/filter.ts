import { Status } from '../types/Status';

type SetQuery = { type: 'filter/SET_QUERY', payload: string };
type SetStatus = { type: 'filter/SET_STATUS', payload: string };

type Action = SetQuery | SetStatus;

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: string): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
export default filterReducer;
