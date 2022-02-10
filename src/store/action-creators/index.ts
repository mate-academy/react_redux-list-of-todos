import * as TodosActionCreators from './todos';
import * as UserActionCreators from './user';

export default {
  ...TodosActionCreators,
  ...UserActionCreators,
};
