import { Status } from '../types/Status';

type ActionQuery = {
  type: 'filter/query';
  payload: string;
};

type ActionDone = {
  type: 'filter/done';
  payload: Status;
};

type ActionClear = {
  type: 'filter/clear';
};

type Action = ActionQuery | ActionDone | ActionClear;

const QUERY = (query: string): ActionQuery => ({
  type: 'filter/query',
  payload: query,
});

const DONE = (filterBy: Status): ActionDone => ({
  type: 'filter/done',
  payload: filterBy,
});

const CLEAR = () => ({
  type: 'filter/clear',
});

interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

export const actions = { QUERY, DONE, CLEAR };

const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/query':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/done':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/clear':
      return {
        ...state,
        query: '',
      };
    default:
      return {
        query: '',
        status: Status.All,
      };
  }
};

export default filterReducer;
