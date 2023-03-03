import { Todo } from '../../types/Todo';
import { SetTodosAction, TodosActions } from './types';

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: TodosActions.SET_TODOS,
  payload: todos,
});

export const actions = { setTodos };
