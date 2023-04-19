import { Status } from '../types/Status';

type SetQueryAction = { type: 'qury/change', payload: string };
type SetStatusAction = { type: 'status/change', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'qury/change',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/change',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;

export type State = {
  query: string,
  status: Status,
};

const defaultState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'qury/change':
      return { ...state, query: action.payload };

    case 'status/change':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
