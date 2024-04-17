import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};
type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type Action = SetStatusAction | SetQueryAction;

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.All,
};

export const actions = { setQuery, setStatus };

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
