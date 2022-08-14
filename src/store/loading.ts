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

const loadingReducer = (loading = false, action: Action) => {
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
  startLoading: () => ({ type: 'START_LOADING' }),
  finishLoading: () => ({ type: 'FINISH_LOADING' }),
};

export const selectors = {
  isLoading: (loading: boolean) => loading,
};

export default loadingReducer;
