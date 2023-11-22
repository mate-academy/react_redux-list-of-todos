import { Status } from '../types/Status';

type SetStatus = { type: 'status/SET', payload: Status };
type SetQuery = { type: 'query/SET', payload: string };
type ClearQuery = { type: 'query/CLEAR' };

type Action = SetStatus | SetQuery | ClearQuery;

const setStatus = (value: Status): Action => ({
  type: 'status/SET',
  payload: value,
});

const setQuery = (value: string): Action => ({
  type: 'query/SET',
  payload: value,
});

const clearQuery = (): Action => ({
  type: 'query/CLEAR',
});

export const actions = { setStatus, setQuery, clearQuery };

type Filter = {
  query: string,
  status: Status,
};

const filterState: Filter = {
  query: '',
  status: Status.all,
};

const filterReducer = (filter = filterState, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...filter, query: action.payload };
    case 'query/CLEAR':
      return { ...filter, query: '' };
    case 'status/SET':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
