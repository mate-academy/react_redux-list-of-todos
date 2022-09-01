type StartLoading = {
  type: 'START_LOADING',
};

type FinishLoading = {
  type: 'FINISH_LOADING',
};

export const actions = {
  startLoading: (): StartLoading => ({ type: 'START_LOADING' }),
  finishLoading: (): FinishLoading => ({ type: 'FINISH_LOADING' }),
};

type Action = StartLoading | FinishLoading;

export const selectors = {
  getLoading: (loading: boolean) => loading,
};

const initialState = false;

const loadingReducer = (state = initialState, action: Action): boolean => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'FINISH_LOADING':
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
