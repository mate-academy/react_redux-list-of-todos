export enum LoadingReducerActionTypes {
  START_LOADING = 'START_LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
}

export type StartLoading = {
  type: LoadingReducerActionTypes.START_LOADING,
};

export type FinishLoading = {
  type: LoadingReducerActionTypes.FINISH_LOADING,
};

export type LoadingAction = StartLoading | FinishLoading;
