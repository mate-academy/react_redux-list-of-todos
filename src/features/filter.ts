import { Status } from '../types/Status';

type SetFilterStatusAll = {
  type: 'filterStatus/ALL';
  payload: Status;
};
type SetFilterStatusDone = {
  type: 'filterStatus/COMPLETED';
  payload: Status;
};
type SetFilterStatusActive = {
  type: 'filterStatus/ACTIVE';
  payload: Status;
};
type SetFilterByQuery = {
  type: 'filterQuery/QUERY';
  payload: string;
};

enum ActionsWithFilter {
  ALL = 'filterStatus/ALL',
  COMPLETED = 'filterStatus/COMPLETED',
  ACTIVE = 'filterStatus/ACTIVE',
  QUERY = 'filterQuery/QUERY',
}

const filteredAll = (): SetFilterStatusAll => ({
  type: ActionsWithFilter.ALL,
  payload: 'all',
});

const filteredByCompleted = (): SetFilterStatusDone => ({
  type: ActionsWithFilter.COMPLETED,
  payload: 'completed',
});

const filteredByActive = (): SetFilterStatusActive => ({
  type: ActionsWithFilter.ACTIVE,
  payload: 'active',
});

const filteredByQuery = (query: string): SetFilterByQuery => ({
  type: ActionsWithFilter.QUERY,
  payload: query,
});

export const actionsWithFilter = {
  all: filteredAll,
  completed: filteredByCompleted,
  active: filteredByActive,
  query: filteredByQuery,
};

type State = {
  query: string;
  status: Status;
};

type Action = (
  SetFilterStatusAll | SetFilterStatusDone
  | SetFilterStatusActive | SetFilterByQuery
);

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case ActionsWithFilter.ALL:
      return {
        ...state,
        status: 'all',
      };

    case ActionsWithFilter.ACTIVE:
      return {
        ...state,
        status: 'active',
      };

    case ActionsWithFilter.COMPLETED:
      return {
        ...state,
        status: 'completed',
      };

    case ActionsWithFilter.QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
