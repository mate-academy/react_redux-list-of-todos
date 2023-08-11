import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY'
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type Action = SetQueryAction | SetStatusAction;
type State = {
  query: string;
  status: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
