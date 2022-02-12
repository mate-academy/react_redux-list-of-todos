import { createStore } from 'redux';
import {
  LOAD_TODOS,
  LOAD_USER,
  SET_ERROR,
  SET_STATUS_FILTER,
  SET_TITLE_FILTER,
  SET_USER,
} from './actions';

const initialState: State = {
  todos: [],
  currentUserId: 0,
  titleFilter: '',
  statusFilter: 'all',
  user: null,
  isError: false,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };
    case SET_USER:
      return {
        ...state,
        currentUserId: action.payload,
      };
    case SET_TITLE_FILTER:
      return {
        ...state,
        titleFilter: action.payload,
      };
    case SET_STATUS_FILTER:
      return {
        ...state,
        statusFilter: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
