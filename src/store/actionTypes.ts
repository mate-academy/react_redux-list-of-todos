import { Action as ReduxAction } from 'redux';
import { PreparedTodoType } from '../utils/interfaces';

export enum ActionTypes {
  SetTodos = 'setTodos',
  SetLoading = 'setLoading',
  SetLoaded = 'setLoaded',
  SetSortField = 'setSortField',
  DeleteTodo = 'setDeleteTodo',
}

export interface Action<T extends ActionTypes = ActionTypes, P = null> extends ReduxAction<T> {
  payload: P;
}

export type SetTodosAction = Action<ActionTypes.SetTodos, PreparedTodoType[]>;
export type SetLoadingAction = Action<ActionTypes.SetLoading, boolean>;
export type SetLoadedAction = Action<ActionTypes.SetLoaded, boolean>;
export type SetSortFieldAction = Action<ActionTypes.SetSortField, string>;
export type DeleteTodoAction = Action<ActionTypes.DeleteTodo, number>;

export type Actions = SetTodosAction
| SetLoadingAction
| SetLoadedAction
| SetSortFieldAction
| DeleteTodoAction;
