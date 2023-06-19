import { Todo } from '../../types/Todo';
import {
  RemoveTodoAction,
  CurrentTodoActions,
  SetTodoAction,
} from './types';

const removeTodo = (): RemoveTodoAction => ({
  type: CurrentTodoActions.REMOVE,
});
const setTodo = (todo: Todo): SetTodoAction => ({
  type: CurrentTodoActions.SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };
