import { createStore, AnyAction } from 'redux';
import {
  CLEAR_USER,
  DELETE_TODO,
  LOAD_TODOS, LOAD_USER, SAVE_INPUT, SELECT_OPTION,
} from './actions';

const initialState: State = {
  todos: [],
  input: '',
  user: null,
  option: 'all',
};

const todosReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case SAVE_INPUT:
      return {
        ...state,
        input: action.payload,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    case SELECT_OPTION:
      return {
        ...state,
        option: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(todosReducer);

export default store;
