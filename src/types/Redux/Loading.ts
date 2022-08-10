export type StartLoadingAction = {
  type: 'loading/start';
};

export type FinishLoadingAction = {
  type: 'loading/finish';
};

export type LoadingAction = StartLoadingAction | FinishLoadingAction;
