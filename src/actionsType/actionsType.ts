import { Actions } from "../store/store";

export interface setPrepearedTodoListActionInterface {
    type: typeof Actions.SET_PREPEARED_TODO_LIST;
    prepearedTodoList: TodoWithUser[] | [];
}

export interface setLoadingConditionActionInterface {
    type: typeof Actions.SET_LOADING_CONDITION;
}

export interface deleteTodoItemInterface {
    type: typeof Actions.DELETE_TODO_ITEM;
    deletedItemId: number;
}

export interface setSortedTodoListInterface {
    type: typeof Actions.SET_SORTED_TODO_LIST;
    sortedTodoList: TodoWithUser[] | [];
}

export type ActionType = setPrepearedTodoListActionInterface
    | setLoadingConditionActionInterface
    | deleteTodoItemInterface
    | setSortedTodoListInterface;

export type AppActions = ActionType;
