import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Filter = {
  query: string;
  status: Status;
};
type Action = SetQueryAction | SetStatusAction;

const startFilters: Filter = { query: '', status: Status.All };

const filterReducer = (
  filter: Filter = startFilters,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
