import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status;
};

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

type Action = SetStatusAction | QueryAction;

type State = {
  query: string;
  status: Status;
};

const initialState = { query: '', status: Status.All };

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = { setStatus, setQuery };

export default filterReducer;
