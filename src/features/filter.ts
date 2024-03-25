import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type ClearQueryAction = {
  type: 'query/CLEAR';
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'query/CLEAR',
});

const initialState = {
  query: '',
  status: 'all',
};

export const actions = { setStatus, setQuery, clearQuery };
type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'status/SET':
      return { ...state, status: action.payload };

    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
