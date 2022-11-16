import { Status } from '../types/Status';

type StatusAction = { type: 'filters/STATUS', payload: Status };
type QueryAction = { type: 'filters/QUERY', payload: string };

type Action = StatusAction | QueryAction;

const status = (value: Status): StatusAction => ({
  type: 'filters/STATUS',
  payload: value,
});

const query = (value: string): QueryAction => ({
  type: 'filters/QUERY',
  payload: value,
});

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filters = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filters/STATUS':
      return { ...filters, status: action.payload };

    case 'filters/QUERY':
      return { ...filters, query: action.payload };

    default:
      return filters;
  }
};

export const actions = { status, query };

export default filterReducer;
