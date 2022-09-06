import type { RootState } from '../app/store';

export enum LoadingActionType {
  setTodoLoading = 'todoLoading/SET',
  setTodosLoading = 'todosLoading/SET',
}

type SetTodoLoading = {
  type: LoadingActionType.setTodoLoading;
  payload: boolean;
};

type SetTodosLoading = {
  type: LoadingActionType.setTodosLoading;
  payload: boolean;
};

const setTodoLoading = (status: boolean): SetTodoLoading => ({
  type: LoadingActionType.setTodoLoading,
  payload: status,
});

const setTodosLoading = (status: boolean): SetTodosLoading => ({
  type: LoadingActionType.setTodosLoading,
  payload: status,
});

export const LOADING_ACTIONS = { setTodoLoading, setTodosLoading };

export const LOADING_SELECTORS = {
  getTodoLoadingStatus: (state: RootState) => state.loading.todoLoading,
  getTodosLoadingStatus: (state: RootState) => state.loading.todosLoading,
};

type State = {
  todoLoading: boolean,
  todosLoading: boolean,
};

const initialState: State = {
  todoLoading: false,
  todosLoading: false,
};

type Action = SetTodoLoading | SetTodosLoading;

const loadingReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case LoadingActionType.setTodoLoading:
      return { ...state, todoLoading: action.payload };
    case LoadingActionType.setTodosLoading:
      return { ...state, todosLoading: action.payload };
    default:
      return state;
  }
};

export default loadingReducer;
