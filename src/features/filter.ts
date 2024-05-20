import { Status } from '../types/Status';

type StatusAction = { type: 'filter/SET_STATUS'; payload: Status };
type QueryAction = { type: 'query/SET_QUERY'; payload: string };

type Action = StatusAction | QueryAction;

type FilterState = {
  query: string;
  status: Status;
};

export const actions = {
  setStatus: (status: Status): StatusAction => ({
    type: 'filter/SET_STATUS',
    payload: status,
  }),

  setQuery: (query: string): QueryAction => ({
    type: 'query/SET_QUERY',
    payload: query,
  }),
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};
/* eslint-disable-next-line*/
const filterReducer = (state: FilterState = initialState, action: Action): FilterState => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'query/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return initialState;
  }
};

export default filterReducer;
