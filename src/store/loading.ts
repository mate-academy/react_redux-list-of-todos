type StartLoadingAction = {
  type: 'SET_START',
};

type FinishLoadingAction = {
  type: 'SET_FINISH',
};

export type LoadingAction = StartLoadingAction | FinishLoadingAction;

export const loadingReducer = (
  loading = false,
  action: LoadingAction,
) => {
  switch (action.type) {
    case 'SET_START':
      return true;
    case 'SET_FINISH':
      return false;
    default:
      return loading;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({ type: 'SET_START' }),
  finishLoading: (): FinishLoadingAction => ({ type: 'SET_FINISH' }),
};
