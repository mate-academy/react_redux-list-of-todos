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

type RootState = boolean;

const initialState: RootState = false;

const loadingReducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'FINISH_LOADING':
      return false;

    default:
      return state;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};

export default loadingReducer;
