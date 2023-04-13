import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'QUERY';
  payload: string;
};

const SetQuery = (query: string): SetQueryAction => ({
  type: 'QUERY',
  payload: query,
});

type SetStatusAction = {
  type: 'STATUS';
  payload: Status;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'STATUS',
  payload: status,
});

type State = {
  query: string,
  status: Status
};

type Action = SetQueryAction | SetStatusAction;
export const actions = { SetQuery, setStatus };

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, query: action.payload };

    case 'STATUS': {
      return { ...state, status: action.payload };
    }

    default: {
      return state;
      break;
    }
  }
};

export default filterReducer;
