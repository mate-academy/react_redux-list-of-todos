type StartLoadingAction = {
  type: 'START_LOADING',
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING',
};

export type LoadingAction = (
  StartLoadingAction
  | FinishLoadingAction
);

export type LoadingState = {
  isLoaded: boolean;
};

const initialState: LoadingState = {
  isLoaded: false,
};

export const loadingReducer = (
  state = initialState, action: LoadingAction,
): LoadingState => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoaded: false,
      };

    case 'FINISH_LOADING':
      return {
        isLoaded: true,
      };

    default:
      return state;
  }
};

export const actionsLoading = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};

export const selectorsLoading = {
  getLoaded: (state: LoadingState) => state.isLoaded,
};
