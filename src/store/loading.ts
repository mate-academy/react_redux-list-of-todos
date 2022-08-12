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

const loadingReducer = (isLoading = false, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'FINISH_LOADING':
      return false;

    default:
      return isLoading;
  }
};

export const loadActions = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};

export default loadingReducer;
