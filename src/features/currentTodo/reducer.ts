import {
  CurrentTodoActions,
  State,
  Action,
} from './types';

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case CurrentTodoActions.REMOVE:
      return null;

    case CurrentTodoActions.SET:
      return action.payload;

    default:
      return state;
  }
};

export default currentTodoReducer;
