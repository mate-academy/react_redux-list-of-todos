import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SETSTATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SETQUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

type State = {
  query: string;
  status: Status;
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SETSTATUS': {
      return { ...state, status: action.payload };
    }

    case 'filter/SETQUERY': {
      return { ...state, query: action.payload };
    }

    default:
      return state;
  }
};

export const actions = {
  setStatus,
  setQuery,
};

export default filterReducer;
