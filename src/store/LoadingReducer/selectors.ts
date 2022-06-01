import { State } from '../../types/State';

export const isLoading = (state: State) => {
  return state.LoadingReducer.loading;
};

export const getMessage = (state: State) => {
  return state.LoadingReducer.message;
};
