import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ClearSearchAction = {
  type: 'filter/CLEAR_SEARCH';
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type Action = SetQueryAction | ClearSearchAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearSearch = (): ClearSearchAction => ({
  type: 'filter/CLEAR_SEARCH',
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = {
  setQuery,
  clearSearch,
  setStatus,
};

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  status: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...status, query: action.payload };

    case 'filter/CLEAR_SEARCH':
      return { ...status, query: '' };

    case 'filter/SET_STATUS':
      return { ...status, status: action.payload };

    default:
      return status;
  }
};

export default filterReducer;
