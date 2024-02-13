import { Status } from '../types/Status';

interface State {
  query: string,
  status: Status,
}

type SetQueryAction = { type: 'filterReducer/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filterReducer/SET_STATUS', payload: Status };

const setQuery = (query: string): SetQueryAction => (
  { type: 'filterReducer/SET_QUERY', payload: query }
);

const setStatus = (status: Status): SetStatusAction => (
  { type: 'filterReducer/SET_STATUS', payload: status }
);

type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'filterReducer/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filterReducer/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
