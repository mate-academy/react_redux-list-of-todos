import { Status } from '../types/Status';

interface SetQueryAction {
  type: 'query/SET';
  payload: string;
}

interface SetStatusAction {
  type: 'status/SET';
  payload: Status;
}

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;
type State = { query: string, status: Status };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
) => {
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
