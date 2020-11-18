import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return false;
    case FINISH_LOADING:
      return true;

    default:
      return loading;
  }
};

export default reducer;
