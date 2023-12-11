import { Status } from '../types/Status';

const FILTER = 'filter';
const CLEAR = 'clear';

type FilterAction = {
  type: typeof FILTER;
  status: Status;
  query: string;
};

type ClearAction = {
  type: typeof CLEAR;
  status: Status;
};

type Filter = {
  status: Status;
  query: string;
};

export const actionsFilter = {
  filter: (status: Status, query: string): FilterAction => ({
    type: FILTER,
    status,
    query,
  }),
  clear: (status: Status): ClearAction => ({
    type: CLEAR,
    status,
  }),

};

type Actions = FilterAction | ClearAction;

const initialStore: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (store = initialStore, action: Actions): Filter => {
  switch (action.type) {
    case FILTER:
      return {
        query: action.query,
        status: action.status,
      };
    case CLEAR:
      return {
        query: '',
        status: action.status,
      };

    default:
      return store;
  }
};

export default filterReducer;
