import { Action as BasicAction } from 'redux';

export type StartLoadingAction = BasicAction<LoadingActionsType.StartLoading>;
export type FinishLoadingAction = BasicAction<LoadingActionsType.FinishLoading>;
export type LoadingActions = StartLoadingAction | FinishLoadingAction;

export enum LoadingActionsType {
  StartLoading = 'loading/start_loading',
  FinishLoading = 'loading/finish_loading',
}

export const startLoadingActionCreator = (): StartLoadingAction => ({
  type: LoadingActionsType.StartLoading,
});
export const finishLoadingActionCreator = (): FinishLoadingAction => ({
  type: LoadingActionsType.FinishLoading,
});

export const LOADING_ACTIONS_CREATOR = {
  start: startLoadingActionCreator,
  finish: finishLoadingActionCreator,
};

const initialLoading = false;

export const loadingReducer = (
  loading: boolean = initialLoading,
  action: LoadingActions,
): boolean => {
  switch (action.type) {
    case LoadingActionsType.StartLoading:
      return true;
    case LoadingActionsType.FinishLoading:
      return false;
    default:
      return loading;
  }
};
