import {
  ActionsType,
  AddTodosAction,
  AddUserAction,
  DeleteTodoAction,
  SetSelectedUserIdAction,
} from './types';

export const addTodos = (payload: Todo[]): AddTodosAction => ({
  type: ActionsType.AddTodos,
  payload,
});

export const setSelectedUserId = (
  payload: number,
): SetSelectedUserIdAction => ({
  type: ActionsType.SetSelectedUserId,
  payload,
});

export const addUser = (payload: User): AddUserAction => ({
  type: ActionsType.AddUser,
  payload,
});

export const deleteTodo = (payload: number): DeleteTodoAction => ({
  type: ActionsType.DeleteTodo,
  payload,
});

export const ACTIONS = {
  addTodos,
  setSelectedUserId,
  addUser,
  deleteTodo,
};
