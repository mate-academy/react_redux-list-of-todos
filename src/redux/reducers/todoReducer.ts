import { AnyAction } from 'redux';
import { type } from '../actions';

const todosState: TodoState = {
  todos: [],
  users: [],
};

export const todosReducer = (state = todosState, action: AnyAction): TodoState => {
  switch (action.type) {
    case type.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.index),
      };
    case type.SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case type.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
