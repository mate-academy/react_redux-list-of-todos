type StartLoadingAction = {
  type: 'loading/START',
};

type FinishLoadingAction = {
  type: 'loading/FINISH',
};

type Action = StartLoadingAction | FinishLoadingAction;
type State = boolean;

export const actions = {
  startLoading: (): StartLoadingAction => ({ type: 'loading/START' }),
  finishLoading: (): FinishLoadingAction => ({ type: 'loading/FINISH' }),
};

const loadingReducer = (state: State = false, action: Action) => {
  switch (action.type) {
    case 'loading/START':
      return true;

    case 'loading/FINISH':
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
