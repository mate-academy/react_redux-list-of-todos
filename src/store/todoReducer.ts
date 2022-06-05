import { AnyAction, Dispatch } from 'redux';
import { getTodosFS } from '../api';
import { Todo } from '../type/todo';

enum TodoAction {
  UploadTodos = 'Upload::Todos',
  DeleteTodo = 'Delete::Todo',
}

export const todoAction = {
  uploadTodos: (todos: Todo[]) => (
    { type: TodoAction.UploadTodos, payload: todos }
  ),
  deleteTodo: (todoId: number) => (
    { type: TodoAction.DeleteTodo, payload: todoId }
  ),
};

export const uploadTodos = () => {
  return async (dispatch: Dispatch) => {
    const data = await getTodosFS();

    dispatch(todoAction.uploadTodos(data));
  };
};

export type TodoState = {
  todos: Todo[] | [];
  userId: number;
};

const initialState: TodoState = {
  todos: [],
  userId: 0,
};

export const todoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TodoAction.UploadTodos:
      return { ...state, todos: action.payload };

    case TodoAction.DeleteTodo:
      return {
        ...state,
        todos: state.todos
          .filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};
