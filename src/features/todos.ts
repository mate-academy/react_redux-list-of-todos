import { Todo } from '../types/Todo';
import { ActionTypes } from '../types/Actions';

export type SetTodosAction = {
  type: ActionTypes.todosSet;
  payload: Todo[];
};

export const setTodos = (todos: Todo[]) => ({
  type: ActionTypes.todosSet,
  payload: todos,
});

type State = Todo[];

const todosReducer = (
  state: State = [],
  action: SetTodosAction,
): Todo[] => {
  if (action.type === ActionTypes.todosSet) {
    return action.payload;
  }

  return state;
};

export default todosReducer;
