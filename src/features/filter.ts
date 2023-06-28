import { Status } from '../types/Status';

type StatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

type QueryAction = {
  type: 'filter/QUERY'
  payload: string,
};

type Action = StatusAction | QueryAction;

const setStatus = (value: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const setQuery = (value: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = { setStatus, setQuery };

type State = {
  status: Status,
  query: string,
};

const filterReducer = (
  state: State = { status: 'all', query: '' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
