import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetFilterAction = {
  type: 'filter/SET_FILTER';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetFilterAction => ({
  type: 'filter/SET_FILTER',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Filter = {
  query: '';
  status: Status;
};

const startFilter: Filter = { query: '', status: Status.ALL };

type Action = SetQueryAction | SetFilterAction;

const filterReducer = (
  filterState: Filter = startFilter,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filterState, query: action.payload };

    case 'filter/SET_FILTER':
      return { ...filterState, status: action.payload };

    default:
      return filterState;
  }
};

export default filterReducer;
