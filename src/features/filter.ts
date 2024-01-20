import { FilterStatus } from '../types/Status';

type SetStatus = { type: 'filter/SET', payload: FilterStatus };

const setStatus = (status: FilterStatus): SetStatus => ({
  type: 'filter/SET',
  payload: status,
});

type GetQueryAction = { type: 'filter/GET', payload: string };

const getQuery = (query: string): GetQueryAction => ({
  type: 'filter/GET',
  payload: query,
});

export const actions = {
  setStatus,
  getQuery,
};

type Action =
  SetStatus
  | GetQueryAction;

type State = {
  query: string,
  status: FilterStatus,
};

const filterReducer = (
  state: State = {
    query: '',
    status: FilterStatus.All,
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET':
      return {
        query: state.query,
        status: action.payload,
      };

    case 'filter/GET':
      return {
        query: action.payload,
        status: state.status,
      };

    default:
      return state;
  }
};

export default filterReducer;
