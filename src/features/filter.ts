import { Status } from '../types/Status';

type FilterAll = {
  type: 'todos/ALL',
  payload: {
    status: Status,
    query: string,
  }
};

type FilterActive = {
  type: 'todos/ACTIVE',
  payload: {
    status: Status,
    query: string,
  }
};

type FilterCompleted = {
  type: 'todos/COMPLETED',
  payload: {
    status: Status,
    query: string,
  }
};

const filterAll = (status: Status, query: string): FilterAll => ({
  type: 'todos/ALL',
  payload: {
    status,
    query,
  },
});

const filterActive = (status: Status, query: string): FilterActive => ({
  type: 'todos/ACTIVE',
  payload: {
    status,
    query,
  },
});

const filterCompleted = (status: Status, query: string): FilterCompleted => ({
  type: 'todos/COMPLETED',
  payload: {
    status,
    query,
  },
});

type Action = FilterAll | FilterActive | FilterCompleted;

export const actions = {
  filterActive,
  filterAll,
  filterCompleted,
};

type State = {
  query: string,
  status: Status,
};

const defaultState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = defaultState,
  action: Action,
) => {
  switch (action.type) {
    case 'todos/ALL':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/ACTIVE':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/COMPLETED':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
