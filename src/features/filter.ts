import { Status } from '../types/Status';

type FilterByStatus = {
  type: 'filter/BY_STATUS',
  payload: Status,
};

type FilterByQuery = {
  type: 'filter/BY_QUERY',
  payload: string,
};

const setStatus = (status: Status): FilterByStatus => ({
  type: 'filter/BY_STATUS',
  payload: status,
});

const setQuery = (query: string): FilterByQuery => ({
  type: 'filter/BY_QUERY',
  payload: query,
});

type Action = FilterByStatus | FilterByQuery;

export const actions = { setStatus, setQuery };

type State = {
  query: string,
  status: Status,
};

const defaultState = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: State = defaultState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/BY_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/BY_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
