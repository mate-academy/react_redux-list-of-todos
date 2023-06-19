import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';

export enum FilterActions {
  SET_STATUS = 'filter/SET_STATUS',
  SET_QUERY = 'filter/SET_QUERY',
  CLEAR_QUERY = 'filter/CLEAR_QUERY',
}

export type ValueOf<T> = T[keyof T];

export type StatusActionType = {
  type: FilterActions.SET_STATUS;
  payload: ValueOf<TodoStatusTypes>;
};

export type SetQueryActionType = {
  type: FilterActions.SET_QUERY;
  payload: string;
};

export type ClearQueryActionType = {
  type: FilterActions.CLEAR_QUERY;
  payload: string;
};

export type State = {
  query: string;
  status: ValueOf<TodoStatusTypes>;
};

export type Action
= StatusActionType | SetQueryActionType | ClearQueryActionType;
