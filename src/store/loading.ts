type StartLoadingAction = {
  type: 'START_LOADING',
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING',
};

type Action = StartLoadingAction | FinishLoadingAction;

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};

const defaultState = {
  loading: true,
};

export const loadingReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;
    case 'FINISH_LOADING':
      return false;
    default:
      return state;
  }
};
