import { Reducer } from '../types/Reducer';
import { Status } from '../types/Status';

type Action = Filter | Query;
type State = { status: Status, query: string };

type Filter = { type: typeof Reducer.FILTER, payload: Status } ;
type Query = { type: typeof Reducer.QUERY, payload: string } ;

const initial: State = {
  status: 'all',
  query: '',
};

const filter = (filterValue: Status): Filter => ({
  type: Reducer.FILTER,
  payload: filterValue,
});

const setQuery = (query = ''): Query => ({
  type: Reducer.QUERY,
  payload: query,
});

export const actions = { filter, setQuery };

const filterReducer = (state: State = initial, action: Action): State => {
  const { type, payload } = action;
  const { status, query } = state;

  switch (type) {
    case Reducer.FILTER:
      return {
        status: payload,
        query,
      };

    case Reducer.QUERY:
      return {
        status,
        query: payload,
      };

    default: return state;
  }
};

export default filterReducer;
