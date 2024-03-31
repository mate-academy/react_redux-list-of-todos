import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const defaultFilter: Filter = {
  query: '',
  status: 'all',
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

type RemoveQueryAction = { type: 'query/REMOVE' };

const removeQuery = (): RemoveQueryAction => ({ type: 'query/REMOVE' });

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type Action = SetStatusAction | SetQueryAction | RemoveQueryAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (filter = defaultFilter, action: Action): Filter => {
  switch (action.type) {
    case 'query/SET':
      return {
        query: action.payload,
        status: filter.status,
      };

    case 'query/REMOVE':
      return {
        query: '',
        status: filter.status,
      };

    case 'status/SET':
      return {
        query: '',
        status: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;
