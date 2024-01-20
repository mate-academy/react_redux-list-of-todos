import { Status } from '../types/Status';

type SetAllFilterAction = { type: 'filter/ALL' };

const setStatusAll = (): SetAllFilterAction => ({
  type: 'filter/ALL',
});

type SetActiveFilterAction = { type: 'filter/ACTIVE' };

const setStatusActive = (): SetActiveFilterAction => ({
  type: 'filter/ACTIVE',
});

type SetCompletedFilterAction = { type: 'filter/COMPLETED' };

const setStatusCompleted = (): SetCompletedFilterAction => ({
  type: 'filter/COMPLETED',
});

type GetQueryAction = { type: 'filter/GET', payload: string };

const getQuery = (query: string): GetQueryAction => ({
  type: 'filter/GET',
  payload: query,
});

export const actions = {
  setStatusAll,
  setStatusActive,
  setStatusCompleted,
  getQuery,
};

type Action =
  SetAllFilterAction
  | SetActiveFilterAction
  | SetCompletedFilterAction
  | GetQueryAction;

type State = {
  query: string,
  status: Status,
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/ALL':
      return {
        query: state.query,
        status: 'all',
      };

    case 'filter/ACTIVE':
      return {
        query: state.query,
        status: 'active',
      };

    case 'filter/COMPLETED':
      return {
        query: state.query,
        status: 'completed',
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
