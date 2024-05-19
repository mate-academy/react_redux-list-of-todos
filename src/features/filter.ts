import { Status } from '../types/Status';

type SetQuery = {
  type: 'query/SET';
  payload: string;
};

const setQuery = (query: string): SetQuery => ({
  type: 'query/SET',
  payload: query,
});

type SetStatus = {
  type: 'status/SET';
  payload: Status;
};

const setStatus = (status: Status): SetStatus => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Action = SetQuery | SetStatus;
type FilterParams = {
  status: Status;
  query: string;
};

const initialFilter: FilterParams = {
  status: 'all',
  query: '',
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  filterParams: FilterParams = initialFilter,
  action: Action,
) => {
  switch (action.type) {
    case 'query/SET':
      return { ...filterParams, query: action.payload };

    case 'status/SET':
      return { ...filterParams, status: action.payload };

    default:
      return filterParams;
  }
};

export default filterReducer;
