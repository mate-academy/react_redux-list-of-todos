import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type ClearQuery = {
  type: 'filter/CLEAR_QUERY',
};

type StatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

const filterByQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'filter/CLEAR_QUERY',
});

const filterByStatus = (status: Status): StatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = QueryAction | ClearQuery | StatusAction;

export const actions = { filterByQuery, clearQuery, filterByStatus };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
