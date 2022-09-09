import { Status } from '../types/Status';

export enum FilterMethods {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export enum FiltersActionType {
  ALL = 'filterStatus/ALL',
  COMPLETED = 'filterStatus/COMPLETED',
  ACTIVE = 'filterStatus/ACTIVE',
  QUERY = 'filterQuery/QUERY',
}

type SetFilterStatusAll = {
  type: FiltersActionType.ALL;
  payload: Status;
};
type SetFilterStatusDone = {
  type: FiltersActionType.COMPLETED;
  payload: Status;
};
type SetFilterStatusActive = {
  type: FiltersActionType.ACTIVE;
  payload: Status;
};
type SetFilterByQuery = {
  type: FiltersActionType.QUERY;
  payload: string;
};

const filteredAll = (): SetFilterStatusAll => ({
  type: FiltersActionType.ALL,
  payload: FilterMethods.ALL,
});

const filteredByCompleted = (): SetFilterStatusDone => ({
  type: FiltersActionType.COMPLETED,
  payload: FilterMethods.COMPLETED,
});

const filteredByActive = (): SetFilterStatusActive => ({
  type: FiltersActionType.ACTIVE,
  payload: FilterMethods.ACTIVE,
});

const filteredByQuery = (query: string): SetFilterByQuery => ({
  type: FiltersActionType.QUERY,
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
    case FiltersActionType.ALL:
      return {
        ...state,
        status: FilterMethods.ALL,
      };

    case FiltersActionType.ACTIVE:
      return {
        ...state,
        status: FilterMethods.ACTIVE,
      };

    case FiltersActionType.COMPLETED:
      return {
        ...state,
        status: FilterMethods.COMPLETED,
      };

    case FiltersActionType.QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
