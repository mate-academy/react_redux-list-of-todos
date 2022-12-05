import { Status } from '../types/Status';

type StateType = {
  query: string,
  status: Status,
};

const initialState: StateType = {
  query: '',
  status: 'all',
};

type QueryType = {
  type: 'SET_QUERY',
  payload: string,
};

type StatusType = {
  type: 'SET_STATUS',
  payload: Status,
};

type Action = QueryType | StatusType;

const query = (value: string): QueryType => ({
  type: 'SET_QUERY',
  payload: value,
});

const status = (value: Status): StatusType => ({
  type: 'SET_STATUS',
  payload: value,
});

export const actions = { query, status };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
