import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => (
  { type: 'query/SET', payload: query }
);

const setStatus = (status: Status): SetStatusAction => (
  { type: 'status/SET', payload: status }
);

type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
