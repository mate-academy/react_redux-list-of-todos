import * as UserActionCreators from './user';
import * as TodosActionCreators from './todo';

export default {
  ...TodosActionCreators,
  ...UserActionCreators,
};
