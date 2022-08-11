type StartLoadingAction = {
  type: 'loading/start';
};

type FinishLoadingAction = {
  type: 'loading/finish';
};

type LoadingAction = StartLoadingAction | FinishLoadingAction;

export const loadingReducer = (
  loading = false,
  action: LoadingAction,
) => {
  switch (action.type) {
    case 'loading/start':
      return true;

    case 'loading/finish':
      return false;

    default:
      return loading;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({ type: 'loading/start' }),
  finishLoading: (): FinishLoadingAction => ({ type: 'loading/finish' }),
};
