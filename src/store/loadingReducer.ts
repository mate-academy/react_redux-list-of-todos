const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const actions = {
  startLoading: () => ({ type: START_LOADING }),
  finishLoading: () => ({ type: FINISH_LOADING }),
};

type Action = {
  type: 'START_LOADING' | 'FINISH_LOADING';
};

export const selectors = {
  getLoading: (loading: boolean) => loading,
};

const initialState = false;

const loadingReducer = (state = initialState, action: Action): boolean => {
  switch (action.type) {
    case START_LOADING:
      return true;

    case FINISH_LOADING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
