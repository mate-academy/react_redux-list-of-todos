import * as UserActionCreators from './user';
import * as TodoActionCreators from './todo';

export const allActionCreators = {
  ...UserActionCreators,
  ...TodoActionCreators,
};
