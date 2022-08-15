type StartLoadingAction = {
  type: 'START_LOADING',
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING',
};

type Action = (
  StartLoadingAction
  | FinishLoadingAction
);

export const loadingActions = {
  startLoading: (): StartLoadingAction => ({ type: 'START_LOADING' }),
  finishLoading: (): FinishLoadingAction => ({ type: 'FINISH_LOADING' }),
};

export const loadingReducer = (loading = false, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return false;

    case 'FINISH_LOADING':
      return true;

    default:
      return loading;
  }
};
