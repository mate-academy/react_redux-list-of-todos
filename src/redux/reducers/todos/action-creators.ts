import { Todo } from '../../../types/Todo';
import {
  ActionTypes,
  SetTodosAction,
  SetCurrentUserAction,
  DeleteTodoAction,
} from './types';

export const TodosActionCreators = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: ActionTypes.SET_TODOS,
    payload: todos,
  }),

  setSelectedUser: (userId: number | null): SetCurrentUserAction => ({
    type: ActionTypes.SELECT_USER,
    payload: userId,
  }),

  deleteTodo: (todoId: number): DeleteTodoAction => ({
    type: ActionTypes.DELETE_TODO,
    payload: todoId,
  }),
};
