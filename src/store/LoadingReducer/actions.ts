export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});
