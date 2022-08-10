// type FinishLoading = {
//   type: 'loading/finish',
//   message: boolean,
// };

type Action = {
  type: 'loading/start' | 'loading/finish';
};

export type LoadingType = boolean;

const initialState = true;

// eslint-disable-next-line max-len
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
