import { Status } from '../types/Status';

type FilterStatusAction = { type: 'filter/STATUS', payload: Status };
type FilterQueryAction = { type: 'filter/QUERY', payload: string };

const filterStatus = (status: Status): FilterStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const filterQuery = (query: string): FilterQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = {
  filterStatus,
  filterQuery,
};

type Action = FilterStatusAction | FilterQueryAction;

export type State = {
  query: string,
  status: Status,
};

const defaultState: State = {
  query: '',
  status: Status.All,
};

const filterReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
