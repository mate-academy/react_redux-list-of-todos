import { Status } from '../types/Status';

type QueryAction = { type: 'filter/Query', payload: string };
type StatusAction = { type: 'filter/Status', payload: Status };

type Action = QueryAction | StatusAction;

const setQuery = (
  value: string,
): QueryAction => ({ type: 'filter/Query', payload: value });

const setStatus = (
  status: Status,
): StatusAction => ({ type: 'filter/Status', payload: status });

type State = {
  query: string,
  status: Status,
};

export const actions = { setQuery, setStatus };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filters: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/Query':
      return { ...filters, query: action.payload };
    case 'filter/Status':
      return { ...filters, status: action.payload };
    default:
      return filters;
  }
};

export default filterReducer;
