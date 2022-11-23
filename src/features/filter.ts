import { Status } from '../types/Status';

type StatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

type QueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

const status = (value: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const query = (value: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

type Action = StatusAction | QueryAction;

type State = {
  status: Status,
  query: string,
};

const defaultState: State = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = { status, query };

export default filterReducer;
