import { Status } from '../types/Status';

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type State = {
  query: string,
  status: Status,
};

type FilterByQueryType = {
  type: 'filter/query',
  payload: string,
};

type FilterByCompletedType = {
  type: 'filter/complited',
  payload: Status,
};

const initialState: State = {
  status: Filter.ALL,
  query: '',
};

const filterByCompleted = (status: Status): FilterByCompletedType => ({
  type: 'filter/complited',
  payload: status,
});

const filterByQuery = (query: string): FilterByQueryType => ({
  type: 'filter/query',
  payload: query,
});

export const actions = { filterByQuery, filterByCompleted };

const filterReducer = (
  state: State = initialState,
  action: FilterByQueryType | FilterByCompletedType,
): State => {
  switch (action.type) {
    case 'filter/complited':
      return { ...state, status: action.payload };

    case 'filter/query':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
