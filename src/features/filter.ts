import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'currentStatus/SET',
  payload: Status,
};

type SetQueryAction = {
  type: 'currentQuery/SET',
  payload: string,
};

const setStatus = (newStatus: Status): SetStatusAction => ({
  type: 'currentStatus/SET',
  payload: newStatus,
});

const setQuery = (newQuery: string): SetQueryAction => ({
  type: 'currentQuery/SET',
  payload: newQuery,
});

export const actions = { setStatus, setQuery };

type Action = SetStatusAction | SetQueryAction;
type State = {
  query: string,
  status: Status,
};

const filterReducer = (
  state: State = {
    query: '',
    status: Status.All,
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'currentStatus/SET':
      return { ...state, status: action.payload };

    case 'currentQuery/SET':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
