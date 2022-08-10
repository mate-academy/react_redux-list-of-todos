type StartLoadingAction = {
  type: 'START_LOADING',
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING',
};

type LoadingAction = (
  StartLoadingAction
  | FinishLoadingAction
);

export const loadingTodos = (loading = false, action: LoadingAction) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;
    case 'FINISH_LOADING':
      return false;

    default:
      return loading;
  }
};

export const actions = {
  startLoading(): StartLoadingAction {
    return { type: 'START_LOADING' };
  },
  finishLoading(): FinishLoadingAction {
    return { type: 'FINISH_LOADING' };
  },
};
