import { CurrentTodoReducerTypes } from '../types/CurrentTodoReducerTypes';

export const actions = {
  // eslint-disable-next-line max-len
  setTodo: (todoId: number) => ({ type: CurrentTodoReducerTypes.SET_TODO, payload: todoId }),
};

type CurrentTodoAction = {
  type: CurrentTodoReducerTypes.SET_TODO,
  payload: number,
};

export const selectors = {
  setTodo: (todoId: number) => todoId,
};

const initialState = 0;

const loadingReducer = (
  state = initialState,
  action: CurrentTodoAction,
): number => {
  switch (action.type) {
    case CurrentTodoReducerTypes.SET_TODO:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
