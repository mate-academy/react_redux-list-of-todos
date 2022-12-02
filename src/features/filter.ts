import { Status } from '../types/Status';

type StatusType = {
  type: 'status/SET',
  payload: Status,
};

type QueryType = {
  type: 'query/SET',
  payload: string,
};

const status = (value: Status): StatusType => ({
  type: 'status/SET',
  payload: value,
});

const query = (value: string): QueryType => ({
  type: 'query/SET',
  payload: value,
});

type DefaultState = {
  query: string,
  status: Status,
};

type Actions = StatusType | QueryType;

const defaultState: DefaultState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = defaultState, action: Actions): DefaultState => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = {
  status,
  query,
};

export default filterReducer;
