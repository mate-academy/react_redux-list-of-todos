import { Status } from '../types/Status';

type StatusAction = { type: 'filter/STATUS'; payload: Status };
type QueryAction = { type: 'filter/QUERY'; payload: string };
type Action = StatusAction | QueryAction;

export const actions = {
  status: (value: Status): StatusAction => ({
    type: 'filter/STATUS',
    payload: value,
  }),
  query: (value: string): QueryAction => ({
    type: 'filter/QUERY',
    payload: value,
  }),
};

type Filters = {
  query: string;
  status: Status;
};

const initialFilters: Filters = {
  query: '',
  status: Status.all,
};

const filterReducer = (filter = initialFilters, action: Action) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filter, status: action.payload };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
