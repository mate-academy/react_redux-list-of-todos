import { Status } from '../types/Status';

type StatusAction = { type: 'filter/STATUS', payload: Status };
type QueryAction = { type: 'filter/QUERY', payload: string };
type State = { query: string, status: Status };

type Action = StatusAction | QueryAction;

const filterQuery = (query: string): QueryAction => (
  { type: 'filter/QUERY', payload: query }
);

const filterStatus = (status: Status): StatusAction => (
  { type: 'filter/STATUS', payload: status }
);

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };

    case 'filter/QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = {
  filterStatus,
  filterQuery,
};

export default filterReducer;
