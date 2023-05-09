import { Status } from '../types/Status';

type FilterByQuery = { type: 'filter/QUERY', payload: string };
type FilterByStatus = { type: 'filter/STATUS', payload: Status };

type Action = FilterByQuery | FilterByStatus;

const filterQuery = (query: string): FilterByQuery => ({
  type: 'filter/QUERY',
  payload: query,
});

const filterStatus = (status: Status): FilterByStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { filterQuery, filterStatus };

type State = {
  status: Status,
  query: string,
};

const initialState: State = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
