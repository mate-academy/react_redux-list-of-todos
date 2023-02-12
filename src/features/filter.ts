import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

type State = { query: string, status: Status };
type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const defaultState: State = { query: '', status: 'all' };

const filterReducer = (
  state: State = defaultState,
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

export default filterReducer;
