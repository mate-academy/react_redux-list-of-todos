import { Status } from '../types/Status';

export enum FilterMethods {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export enum ActionsWithFilter {
  ALL = 'filterStatus/ALL',
  COMPLETED = 'filterStatus/COMPLETED',
  ACTIVE = 'filterStatus/ACTIVE',
  QUERY = 'filterQuery/QUERY',
}

type SetFilterStatusAll = {
  type: ActionsWithFilter.ALL;
  payload: Status;
};
type SetFilterStatusDone = {
  type: ActionsWithFilter.COMPLETED;
  payload: Status;
};
type SetFilterStatusActive = {
  type: ActionsWithFilter.ACTIVE;
  payload: Status;
};
type SetFilterByQuery = {
  type: ActionsWithFilter.QUERY;
  payload: string;
};

const filteredAll = (): SetFilterStatusAll => ({
  type: ActionsWithFilter.ALL,
  payload: FilterMethods.ALL,
});

const filteredByCompleted = (): SetFilterStatusDone => ({
  type: ActionsWithFilter.COMPLETED,
  payload: FilterMethods.COMPLETED,
});

const filteredByActive = (): SetFilterStatusActive => ({
  type: ActionsWithFilter.ACTIVE,
  payload: FilterMethods.ACTIVE,
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
    status: FilterMethods.ALL,
  },
  action: Action,
): State => {
  switch (action.type) {
    case ActionsWithFilter.ALL:
      return {
        ...state,
        status: FilterMethods.ALL,
      };

    case ActionsWithFilter.ACTIVE:
      return {
        ...state,
        status: FilterMethods.ACTIVE,
      };

    case ActionsWithFilter.COMPLETED:
      return {
        ...state,
        status: FilterMethods.COMPLETED,
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
