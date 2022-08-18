const startLoading = 'loading/start';
const finishLoading = 'loading/finish';

type Action = {
  type: typeof startLoading | typeof finishLoading;
};

export type LoadingType = boolean;

const initialState = true;

const loadingReducer = (loading:LoadingType = initialState, action: Action) => {
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
  startLoading: () => ({ type: 'loading/start' }),
  finishLoading: () => ({ type: 'loading/finish' }),
};

export const selectors = {
  isLoading: (loading: LoadingType) => loading,
};

export default loadingReducer;
