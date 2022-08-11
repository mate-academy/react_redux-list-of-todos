import { Todo } from '../types/Todo';

type StartUserLoadingAction = {
  type: 'START_USER_LOADING',
};

type FinishUserLoadingAction = {
  type: 'FINISH_USER_LOADING',
};

type SetTodoAction = {
  type: 'SET_TODO',
  payload: Todo,
};

type ClearTodoAction = {
  type: 'CLEAR_TODO',
  payload: null,
};

export type CurrentTodoAction = (
  StartUserLoadingAction | FinishUserLoadingAction
  | SetTodoAction | ClearTodoAction
);

export type CurrentTodoState = {
  userLoading: boolean;
  todo: Todo | null;
};

const initialState: CurrentTodoState = {
  userLoading: false,
  todo: null,
};

export const currentTodoReducer = (
  state = initialState, action: CurrentTodoAction,
): CurrentTodoState => {
  switch (action.type) {
    case 'START_USER_LOADING':
      return {
        ...state,
        userLoading: true,
      };

    case 'FINISH_USER_LOADING':
      return {
        ...state,
        userLoading: false,
      };

    case 'SET_TODO':
      return {
        ...state,
        todo: action.payload,
      };

    case 'CLEAR_TODO':
      return {
        ...state,
        todo: null,
      };

    default:
      return state;
  }
};

export const actionsCurrentTodo = {
  startUserLoading: (): StartUserLoadingAction => ({
    type: 'START_USER_LOADING',
  }),

  finishLoading: (): FinishUserLoadingAction => ({
    type: 'FINISH_USER_LOADING',
  }),

  setTodo: (todo: Todo): SetTodoAction => ({
    type: 'SET_TODO',
    payload: todo,
  }),

  clearTodo: (): ClearTodoAction => ({
    type: 'CLEAR_TODO',
    payload: null,
  }),
};

export const selectorsCurrentTodo = {
  userLoading: (state: CurrentTodoState) => state.userLoading,
  todoSetting: (state: CurrentTodoState) => state.todo,
  todoClearing: (state: CurrentTodoState) => state.todo,
};
