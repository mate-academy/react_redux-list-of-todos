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

export const loadingReducer = (loading = false, action: Action) => {
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
  startLoading: (): StartLoadingAction => ({ type: 'START_LOADING' }),

  finishLoading: (): FinishLoadingAction => ({ type: 'FINISH_LOADING' }),
};
