import { Status } from '../types/Status';

type FilterAll = {
  type: 'todos/ALL';
  payload: {
    status: Status;
    query: string;
  }
};

type FilterActive = {
  type: 'todos/ACTIVE';
  payload: {
    status: Status;
    query: string;
  }
};
type FilterCompleted = {
  type: 'todos/COMPLETED';
  payload: {
    status: Status;
    query: string;
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
  filterAll,
  filterActive,
  filterCompleted,
};

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/ALL':
      return {
        ...state,
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/ACTIVE':
      return {
        ...state,
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/COMPLETED':
      return {
        ...state,
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
