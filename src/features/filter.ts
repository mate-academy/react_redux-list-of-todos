import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/set';
  payload: {
    query: string;
  };
};

type ResetQueryAction = {
  type: 'query/reset';
};

type SetFilterAction = {
  type: 'filter/set';
  payload: {
    status: Status;
  };
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/set',
  payload: {
    query,
  },
});

const resetQuery = (): ResetQueryAction => ({
  type: 'query/reset',
});

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/set',
  payload: {
    status,
  },
});

type Actions = SetQueryAction | ResetQueryAction | SetFilterAction;

export const actions = {
  setQuery,
  resetQuery,
  setFilter,
};

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (filter = initialState, action: Actions) => {
  switch (action.type) {
    case 'query/set':
      return {
        ...filter,
        query: action.payload.query,
      };
    case 'query/reset':
      return {
        ...filter,
        query: '',
      };
    case 'filter/set':
      return {
        ...filter,
        status: action.payload.status,
      };
    default:
      return filter;
  }
};

export default filterReducer;
