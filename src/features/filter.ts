import { Status } from '../types/Status';

type FilterAllAction = {
  type: 'filter/ALL',
  payload: {
    status: Status,
    query: string,
  },
};

type FilterActiveAction = {
  type: 'filter/ACTIVE',
  payload: {
    status: Status,
    query: string,
  },
};

type FilterCompletedAction = {
  type: 'filter/COMPLETED',
  payload: {
    status: Status,
    query: string,
  },
};

const filterAll = (filterBy: Status, query: string): FilterAllAction => ({
  type: 'filter/ALL',
  payload: {
    status: filterBy,
    query,
  },
});

const filterActive = (filterBy: Status, query: string): FilterActiveAction => ({
  type: 'filter/ACTIVE',
  payload: {
    status: filterBy,
    query,
  },
});

const filterCompleted = (
  filterBy: Status,
  query: string,
): FilterCompletedAction => ({
  type: 'filter/COMPLETED',
  payload: {
    status: filterBy,
    query,
  },
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

type Action = FilterAllAction | FilterActiveAction | FilterCompletedAction;

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/ALL':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'filter/ACTIVE':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'filter/COMPLETED':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const actions = { filterAll, filterActive, filterCompleted };

export default filterReducer;
