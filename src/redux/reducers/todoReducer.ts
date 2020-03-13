import { AnyAction } from 'redux';
import { type } from '../actions';

const todosState: TodoState = {
  todos: [],
};

export const todosReducer = (state = todosState, action: AnyAction): TodoState => {
  switch (action.type) {
    case type.DELETE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.index),
      };
    case type.SET_TODOS:
      return {
        todos: action.todos,
      };
    default:
      return state;
  }
};
