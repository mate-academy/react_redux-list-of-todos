import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

const setQuery = (text: string): SetQueryAction => (
  { type: 'filter/QUERY', payload: text });

const setStatus = (value: Status): SetStatusAction => (
  { type: 'filter/STATUS', payload: value });

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;

type State = {
  query: string;
  status: Status;
};

const defaultState: State = {
  query: '',
  status: 'all',
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

export default filterReducer;
