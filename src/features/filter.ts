import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };

type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const initState = { query: '', status: 'all' };

type Action = SetQueryAction | SetStatusAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }

  return state;
};

export default filterReducer;
