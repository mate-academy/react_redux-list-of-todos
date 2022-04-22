import { getTodos } from '../../data/todos.api';
import { Todo } from '../../types/todo.type';
import {
  ActionTypes,
  AddTodosAction,
  RemoveTodosAction,
  SelectedUserIdAction,
} from '../types';

const addTodos = (payload: Todo[]): AddTodosAction => ({
  type: ActionTypes.AddTodos,
  payload,
});

const loadTodos = () => async (
  dispatch: (arg0: { type: string; payload: Todo[]; }) => void,
) => {
  const todos = await getTodos();

  const addTodoAction = addTodos(todos);

  dispatch(addTodoAction);
};

const setSelectedUserById = (payload: number): SelectedUserIdAction => ({
  type: ActionTypes.SelectedUserId,
  payload,
});

export const removeTodoById = (payload: number): RemoveTodosAction => ({
  type: ActionTypes.RemoveTodo,
  payload,
});

export const ACTIONS_CREATORS = {
  loadTodos,
  setSelectedUserById,
  removeTodoById,
};
