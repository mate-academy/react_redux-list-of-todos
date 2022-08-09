type Action = {
  type: 'START_LOADING' | 'FINISH_LOADING';
};

export type LoadingType = {
  loading: boolean;
};

export const loadingState: LoadingType = {
  loading: false,
};

const loadingReducer = (state = loadingState, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const actions = {
  startLoading: () => ({
    type: 'START_LOADING',
  }),

  finishLoading: () => ({
    type: 'FINISH_LOADING',
  }),
};

export const selectorsLoading = {
  isLoading: (state: LoadingType) => state.loading,
};

export default loadingReducer;
