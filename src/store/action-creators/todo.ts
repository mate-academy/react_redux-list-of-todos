import { Dispatch } from 'react';
import { deleteOneTodo, getTodos } from '../../api/api';
import {
  DeleteTodoAction,
  LoadTodosAction,
  TodoAction,
  TodoActionTypes,
  UpdateTodosAction,
} from '../types/todo';

export const loadTodosSuccess = (todos: Todo[]): LoadTodosAction => (
  { type: TodoActionTypes.LOAD_TODOS, payload: todos }
);

export const updateTodos = (todos: Todo[]): UpdateTodosAction => (
  { type: TodoActionTypes.UPDATE_TODOS, payload: todos }
);

export const deleteTodoAction = (todoId: number): DeleteTodoAction => (
  { type: TodoActionTypes.DELETE_TODO, payload: todoId }
);

export const loadTodos = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const todos = await getTodos();

      dispatch(loadTodosSuccess(todos));
    } catch (error) {
      // eslint-disable-next-line
      console.log('ERROR FETCHING TODOS');
    }
  };
};

export const deleteTodo = (todoId: number) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    await deleteOneTodo(todoId);

    dispatch(deleteTodoAction(todoId));
  };
};
