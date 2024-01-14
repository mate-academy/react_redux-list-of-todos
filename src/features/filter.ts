import { Status } from '../types/Status';

type StatusesAction = { type: 'filter/STATUS', payload: Status };
const setStatus = (status: Status): StatusesAction => ({
  type: 'filter/STATUS',
  payload: status,
});

type QueryAction = { type: 'filter/QUERY', payload: string };
const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = StatusesAction | QueryAction;

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };

    case 'filter/QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
