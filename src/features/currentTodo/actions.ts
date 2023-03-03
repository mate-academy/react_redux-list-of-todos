import { Todo } from '../../types/Todo';
import { RemoveTodoAction, SetTodoAction, TodoActions } from './types';

const removeTodo = (): RemoveTodoAction => ({
  type: TodoActions.REMOVE_ITEM,
});

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoActions.SET_ITEM,
  payload: todo,
});

export const actions = { setTodo, removeTodo };
