import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string;
  status: Status;
};

type Action = SetStatusAction | SetQueryAction;

const initialState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
