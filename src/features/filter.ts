import { Status } from '../types/Status';

export interface Filter {
  query: string,
  status: Status,
}

type RemoveQueryAction = {
  type: 'filter/query/REMOVE',
};

type SetQueryAction = {
  type: 'filter/query/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/status/SET';
  payload: Status;
};

const removeQuery = (): RemoveQueryAction => ({
  type: 'filter/query/REMOVE',
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/query/SET',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/status/SET',
  payload: status,
});

export const actions = { removeQuery, setQuery, setStatus };

type Action = RemoveQueryAction | SetQueryAction | SetStatusAction;

const filterReducer = (
  state: Filter = { query: '', status: Status.All },
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/query/REMOVE':
      return {
        ...state,
        query: '',
      };

    case 'filter/query/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/status/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
