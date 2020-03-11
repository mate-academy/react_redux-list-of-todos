import {
  LOAD_DATA,
  DELETE_TODO,
} from '../actions/types';
import {
  TodosAction,
  TodoWithUser,
} from '../constants/types';

export const todos = (state: TodoWithUser[] = [], action: TodosAction): TodoWithUser[] => {
  switch (action.type) {
    case LOAD_DATA:
      return [
        ...state,
        ...action.payload as TodoWithUser[],
      ];
    case DELETE_TODO:
      return state.filter(
        (todo: TodoWithUser) => todo.id !== action.payload,
      );
    default:
      return state;
  }
};
