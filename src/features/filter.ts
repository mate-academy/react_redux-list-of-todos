import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/query/SET',
  payload: string,
};

const setQuery = (payload: string): SetQueryAction => ({
  type: 'filter/query/SET',
  payload,
});

type SetStatusAction = {
  type: 'filter/status/SET',
  payload: Status,
};

const setStatus = (payload: Status): SetStatusAction => ({
  type: 'filter/status/SET',
  payload,
});

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;
type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/query/SET':
      return { ...state, query: action.payload };

    case 'filter/status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
