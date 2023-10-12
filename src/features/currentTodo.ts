import { CurrenTodoActionTypes } from '../enums';
import { CurrenTodoAction, CurrenTodoPayload, Todo } from '../types/Todo';

export const removeTodo = () => ({
  type: CurrenTodoActionTypes.REMOVE_TODO,
});

export const setTodo = (todo: Todo) => ({
  type: CurrenTodoActionTypes.SET_TODO,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

const initialState: CurrenTodoPayload = {
  todo: null,
};

const currentTodoReducer = (
  state = initialState,
  action: CurrenTodoAction,
): CurrenTodoPayload => {
  switch (action.type) {
    case CurrenTodoActionTypes.SET_TODO:
      return { todo: { ...action.payload } };
    case CurrenTodoActionTypes.REMOVE_TODO:
      return { todo: null };
    default:
      return state;
  }
};

export default currentTodoReducer;
