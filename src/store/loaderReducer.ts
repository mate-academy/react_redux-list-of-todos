export type ActionLoading = (
  StartLoadingAction
  | FinishLoadingAction
);
export type StartLoadingAction = {
  type: 'START_LOADING',
};

export type FinishLoadingAction = {
  type: 'FINISH_LOADING',
};

// eslint-disable-next-line max-len
export const loaderReducer = (loading = false, action: ActionLoading): boolean => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'FINISH_LOADING':
      return false;

    default:
      return loading;
  }
};

export const actionsLoader = {

};

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};
