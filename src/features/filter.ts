import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const filterActions = { setQuery, setStatus };

type State = {
  query: string,
  status: Status,
};

type Action = SetQueryAction | SetStatusAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        query: action.payload,
        status: state.status,
      };

    case 'filter/STATUS':
      return {
        query: state.query,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
