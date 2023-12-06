import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET',
  payload: string,
};

type SetStatusAction = {
  type: 'status/SET',
  payload: Status,
};

type Action = SetQueryAction | SetStatusAction;

type Filter = {
  query: string,
  status: Status,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const initialFilter = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (filter: Filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...filter, query: action.payload };
    case 'status/SET':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
