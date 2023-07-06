import { Status } from '../types/Status';

const enum ActionType {
  SET_FILTER = 'SET_FILTER',
  SET_QUERY = 'SET_QUERY',
}

type FilterAction = {
  type: ActionType.SET_FILTER,
  payload: Status,
};

type QueryAction = {
  type: ActionType.SET_QUERY,
  payload: string,
};

const setFilter = (status: Status): FilterAction => ({
  type: ActionType.SET_FILTER,
  payload: status,
});

const setQuery = (query: string): QueryAction => ({
  type: ActionType.SET_QUERY,
  payload: query,
});

const initialState = {
  status: Status.All,
  query: '',
};

type Action = FilterAction | QueryAction;

export const actions = { setFilter, setQuery };

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return {
        ...state,
        status: action.payload,
      };
    case ActionType.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
