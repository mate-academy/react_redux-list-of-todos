import { Action } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

type StartLoadingAction = Action<typeof START_LOADING>;
type FinishLoadingAction = Action<typeof FINISH_LOADING>;

export const startLoading = (): StartLoadingAction => ({ type: START_LOADING });
export const finishLoading = (): FinishLoadingAction => ({ type: FINISH_LOADING });

type AlowwedActions = StartLoadingAction | FinishLoadingAction;

const loadingReducer = (loading = false, action: AlowwedActions): boolean => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return loading;
  }
};

export default loadingReducer;
