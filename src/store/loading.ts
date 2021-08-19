import { RootState } from '../types';

// Action types
export const SET_LOADING = 'SET_LOADING';

// Selectors
export const isLoading = (state: RootState) => state.loading;
