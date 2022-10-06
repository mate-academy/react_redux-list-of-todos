import { Status } from '../types/Status';

type StatusAction = { type: 'filter/STATUS'; payload: Status };
type QueryAction = { type: 'filter/QUERY'; payload: string };
type Action = StatusAction | QueryAction;

const status = (value: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const query = (value: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = { status, query };

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filters: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filters, status: action.payload };
    case 'filter/QUERY':
      return { ...filters, query: action.payload };
    default:
      return filters;
  }
};

export default filterReducer;
