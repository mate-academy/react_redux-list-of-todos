import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type SetQuery = {
  type: 'filter/SET_QUERY',
  payload: string,
};

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };

type State = { query: string, status: Status };
type Action = SetStatus | SetQuery;

const filterReducer = (
  state: State = {
    query: '',
    status: Status.All,
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS': {
      return {
        ...state,
        status: action.payload,
      };
    }

    case 'filter/SET_QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default filterReducer;
