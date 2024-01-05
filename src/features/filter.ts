import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/STATUS', payload: Status };
type SetQueryAction = { type: 'filter/QUERY', payload: string };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type Action = SetQueryAction | SetStatusAction;

const initialState: State = {
  status: 'all',
  query: '',
};

type State = {
  status: Status,
  query: string,
};

export const actions = { setQuery, setStatus };

const filterReducer = (
  state: State = initialState,
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
