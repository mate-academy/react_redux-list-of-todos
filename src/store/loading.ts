import { StartLoadingAction, FinishLoadingAction, LoadingAction }
  from '../types/Redux/Loading';

export const loadingReducer = (loading = false, action: LoadingAction) => {
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
  startLoading: ():StartLoadingAction => ({ type: 'loading/start' }),
  finishLoading: ():FinishLoadingAction => ({ type: 'loading/finish' }),
};
