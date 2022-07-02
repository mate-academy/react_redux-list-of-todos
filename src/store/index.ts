import { createStore } from 'redux';
import { Action, State } from '../react-app-env';
import {
  SET_TODOS,
  ADD_TODO,
  SET_USER,
  DELETE_TODO,
} from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.payLoad],
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payLoad],
      };

    case SET_USER:
      return {
        ...state,
        user: action.payLoad,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(person => person.id !== action.payLoad),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
