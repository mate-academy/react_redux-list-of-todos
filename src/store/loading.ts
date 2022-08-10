type StartLoadingAction = {
  type: 'loading/start',
};

type FinishLoadingAction = {
  type: 'loading/finish',
};

export type LoadingAction = StartLoadingAction | FinishLoadingAction;

// eslint-disable-next-line max-len
export const loadingReducer = (loading = false, action: LoadingAction): boolean => {
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
