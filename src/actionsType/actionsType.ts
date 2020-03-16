import { Actions } from '../store/store';

export interface SetPrepearedTodoListActionInterface {
  type: typeof Actions.SET_PREPEARED_TODO_LIST;
  prepearedTodoList: TodoWithUser[];
}

export interface SetLoadingConditionActionInterface {
  type: typeof Actions.SET_LOADING_CONDITION;
}

export interface DeleteTodoItemInterface {
  type: typeof Actions.DELETE_TODO_ITEM;
  deletedItemId: number;
}

export interface SetSortedTodoListInterface {
  type: typeof Actions.SET_SORTED_TODO_LIST;
  sortedTodoList: TodoWithUser[] | [];
}

export type ActionType = SetPrepearedTodoListActionInterface
| SetLoadingConditionActionInterface
| DeleteTodoItemInterface
| SetSortedTodoListInterface;

export type AppActions = ActionType;
