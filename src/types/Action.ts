import { Action as BaseAction } from 'redux';

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}
