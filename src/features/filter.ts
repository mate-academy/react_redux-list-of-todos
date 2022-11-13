import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type StatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

const query = (text: string): QueryAction => (
  { type: 'filter/QUERY', payload: text });

const status = (value: Status): StatusAction => (
  { type: 'filter/STATUS', payload: value });

export const actions = { query, status };

type State = {
  query: string;
  status: Status;
};

const defaultState: State = {
  query: '',
  status: Status.ALL,
};

type Action = QueryAction | StatusAction;

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

export default filterReducer;
