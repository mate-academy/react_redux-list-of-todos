import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY',
  payload: string,
};
type SetStatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};
type State = { query: string, status: string };
type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
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

export default filterReducer;
