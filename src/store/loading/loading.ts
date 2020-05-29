import { AnyAction } from 'redux';

const LOAD_PROCESS = 'LOAD_PROCESS';

export const loadProcess = (status: boolean) => ({ type: LOAD_PROCESS, status });

export const isLoading = (state: RootState) => state.loading;

export const loadingReducer = (state = {loading: false}, action: AnyAction) => {
  switch (action.type) {
    case LOAD_PROCESS:
      return { state, loading: !state.loading };

    default:
      return state;
  }
}
