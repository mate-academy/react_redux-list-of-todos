import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY'
  payload: string
};

type SetStatusAction = {
  type: 'filter/STATUS'
  payload: Status
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

type Action = SetQueryAction | SetStatusAction;

type State = {
  query: string
  status: Status
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
