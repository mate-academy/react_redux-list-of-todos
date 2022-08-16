type StartLoadingAction = {
  type: 'loading/START_LOADING',
};

type FinishLoadingAction = {
  type: 'loading/FINISH_LOADING',
};

export type LoadingAction = (
  StartLoadingAction | FinishLoadingAction
);

export const loadingReducer = (
  loading = false,
  action: LoadingAction,
) => {
  switch (action.type) {
    case 'loading/START_LOADING':
      return true;

    case 'loading/FINISH_LOADING':
      return false;

    default:
      return loading;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'loading/START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'loading/FINISH_LOADING',
  }),
};
