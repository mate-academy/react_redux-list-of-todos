/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../app/store';

export function debounceDispatchAction<T>(
  dispatch: AppDispatch,
  action: (value: T) => any,
  delay: number,
) {
  let timeoutId: number;

  return (value: T) => {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      dispatch(action(value));
    }, delay);
  };
}
