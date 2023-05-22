import { Status } from '../types/Status';

const FILTER = 'filter/FILTER';
const QUERY = 'filter/QUERY';

type Action = Filter | Query;
type State = { status: Status, query: string };

type Filter = { type: typeof FILTER, payload: Status } ;
type Query = { type: typeof QUERY, payload: string } ;

const initial: State = {
  status: 'all',
  query: '',
};

const filter = (filterValue: Status): Filter => ({
  type: FILTER,
  payload: filterValue,
});

const setQuery = (query = ''): Query => ({
  type: QUERY,
  payload: query,
});

export const actions = { filter, setQuery };

const filterReducer = (state: State = initial, action: Action): State => {
  const { type, payload } = action;
  const { status, query } = state;

  switch (type) {
    case 'filter/FILTER':
      return {
        status: payload,
        query,
      };

    case 'filter/QUERY':
      return {
        status,
        query: payload,
      };

    default: return state;
  }
};

export default filterReducer;
