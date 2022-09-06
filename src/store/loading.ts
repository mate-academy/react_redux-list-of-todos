type StartLoadingAction = {
  type: 'loading/startLoading',
};

type FinishLoadingAction = {
  type: 'loading/endLoading',
};

type Action = (
  StartLoadingAction
  | FinishLoadingAction
);

type RootState = boolean;

const loadingReducer = (state = false, action: Action): RootState => {
  switch (action.type) {
    case 'loading/startLoading':
      return true;

    case 'loading/endLoading':
      return false;

    default:
      return state;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'loading/startLoading',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'loading/endLoading',
  }),
};

export default loadingReducer;
