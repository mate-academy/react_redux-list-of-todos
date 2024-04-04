import { Status } from '../types/Status';

type SetStatus = { type: 'filter/SET_STATUS'; payload: string };

type SetQuery = { type: 'filter/SET_QUERY'; payload: string };

const setStatus = (value: string): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

type Action = SetStatus | SetQuery;

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: Status.All,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return initialState;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
