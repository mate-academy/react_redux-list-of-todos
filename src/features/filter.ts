import { Status } from '../types/Status';

type FilterAll = {
  type: 'filter/ALL',
  payload: {
    status: Status,
    query: string,
  }
};

type FilterActive = {
  type: 'filter/ACTIVE',
  payload: {
    status: Status,
    query: string,
  }
};

type FilterCompleted = {
  type: 'filter/COMPLETED',
  payload: {
    status: Status,
    query: string,
  }
};

type FilterQuery = {
  type: 'filter/SET_QUERY',
  payload: {
    status: Status,
    query: string,
  }
};

type Actions = FilterAll | FilterActive | FilterCompleted | FilterQuery;

const filterAll = (status: Status, query: string): FilterAll => ({
  type: 'filter/ALL',
  payload: {
    status,
    query,
  },
});

const filterActive = (status: Status, query: string): FilterActive => ({
  type: 'filter/ACTIVE',
  payload: {
    status,
    query,
  },
});

const filterCompleted = (status: Status, query: string): FilterCompleted => ({
  type: 'filter/COMPLETED',
  payload: {
    status,
    query,
  },
});

const filterQuery = (status: Status, query: string): FilterQuery => ({
  type: 'filter/SET_QUERY',
  payload: {
    status,
    query,
  },
});

export const actions = {
  filterAll,
  filterActive,
  filterCompleted,
  filterQuery,
};

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case 'filter/ALL':
      return { query: action.payload.query, status: action.payload.status };
    case 'filter/ACTIVE':
      return { query: action.payload.query, status: action.payload.status };
    case 'filter/COMPLETED':
      return { query: action.payload.query, status: action.payload.status };
    case 'filter/SET_QUERY':
      return { query: action.payload.query, status: action.payload.status };
    default:
      return state;
  }
};

export default filterReducer;
