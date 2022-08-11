type LoadingState = {
  todosLoading: boolean,
  userLoading: boolean,
};

const initialState = {
  todosLoading: false,
  userLoading: false,
};

type StartLoadingTodosAction = {
  type: 'todos/loading-start'
};

type FinishLoadingTodosAction = {
  type: 'todos/loading-finish'
};

type StartLoadingUserAction = {
  type: 'user/loading-start'
};

type FinishLoadingUserAction = {
  type: 'user/loading-finish'
};

export type LoadingActions
  = StartLoadingTodosAction
  | FinishLoadingTodosAction
  | StartLoadingUserAction
  | FinishLoadingUserAction;

export const actions = {
  startLoadingTodos: (): StartLoadingTodosAction => (
    { type: 'todos/loading-start' }
  ),
  finishLoadingTodos: (): FinishLoadingTodosAction => (
    { type: 'todos/loading-finish' }
  ),
  startLoadingUser: (): StartLoadingUserAction => (
    { type: 'user/loading-start' }
  ),
  finishLoadingUser: (): FinishLoadingUserAction => (
    { type: 'user/loading-finish' }
  ),
};

export const loadingReducer = (
  state: LoadingState = initialState,
  action: LoadingActions,
) => {
  switch (action.type) {
    case 'todos/loading-start':
      return {
        ...state,
        todosLoading: true,
      };

    case 'todos/loading-finish':
      return {
        ...state,
        todosLoading: false,
      };

    case 'user/loading-start':
      return {
        ...state,
        userLoading: true,
      };

    case 'user/loading-finish':
      return {
        ...state,
        userLoading: false,
      };
    default:
      return state;
  }
};
