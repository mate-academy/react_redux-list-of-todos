import { Filters, Status } from '../types';

enum ActionTypes {
  SET_QUERY = 'filter/setQuery',
  REMOVE_QUERY = 'filter/removeQuery',
  SET_STATUS = 'filter/setStatus',
}

interface Actions {
  setQuery: {
    type: ActionTypes.SET_QUERY;
    payload: string;
  };
  removeQuery: {
    type: ActionTypes.REMOVE_QUERY;
  };
  setStatus: {
    type: ActionTypes.SET_STATUS;
    payload: Status;
  };
}

const setQuery = (query: string) => ({
  type: ActionTypes.SET_QUERY,
  payload: query,
});

const removeQuery = () => ({
  type: ActionTypes.REMOVE_QUERY,
});

const setStatus = (status: string) => ({
  type: ActionTypes.SET_STATUS,
  payload: status,
});

export const actions = {
  setQuery,
  removeQuery,
  setStatus,
};

type Action = Actions[keyof Actions];

const initialState: Filters = {
  query: '',
  status: Status.All,
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case ActionTypes.REMOVE_QUERY:
      return {
        ...state,
        query: '',
      };
    case ActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
