import {
  FilterState, FilterTodosTypes, Status, Action,
} from '../types/Status';

const setStatus = (status: Status): Action => {
  return {
    type: FilterTodosTypes.SET_STATUS,
    payload: status,
  };
};

const setQuery = (query: string): Action => {
  return {
    type: FilterTodosTypes.SET_QUERY,
    payload: query,
  };
};

export const actions = { setStatus, setQuery };

const initialState: FilterState = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FilterTodosTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case FilterTodosTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
