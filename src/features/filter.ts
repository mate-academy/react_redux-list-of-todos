import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type StatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type Action = QueryAction | StatusAction;

export const actions = { setQuery, setStatus };

type FilterParams = {
  query: string,
  status: Status,
};

const InitialParams = {
  query: '',
  status: Status.all,
};

const filterReducer = (
  state: FilterParams = InitialParams,
  action: Action,
): FilterParams => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
