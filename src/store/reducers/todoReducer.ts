import { TodoAction, TodoActionTypes, TodoState } from '../types/todo';

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionTypes.LOAD_TODOS:
      return { todos: action.payload };
    case TodoActionTypes.UPDATE_TODOS:
      return { todos: action.payload };
    case TodoActionTypes.DELETE_TODO:
      return {
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      };
    default:
      return state;
  }
};
