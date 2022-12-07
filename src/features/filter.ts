import { Status } from '../types/Status';

type StatusAction = { type: 'filter/STATUS'; payload: Status };
type QuerysAction = { type: 'filter/QUERY'; payload: string };

type Action = StatusAction | QuerysAction;

const status = (value: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const query = (value: string): QuerysAction => ({
  type: 'filter/QUERY',
  payload: value,
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.ALL,
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

export const actions = { status, query };

export default filterReducer;
