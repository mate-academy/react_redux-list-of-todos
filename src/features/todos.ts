import { Todo } from '../types/Todo';
import { ActionTypes } from '../types/Actions';

export type SetTodosAction = {
  type: ActionTypes.TodosSet;
  payload: Todo[];
};

export const setTodos = (todos: Todo[]) => ({
  type: ActionTypes.TodosSet,
  payload: todos,
});

type State = Todo[];

const todosReducer = (
  state: State = [],
  action: SetTodosAction,
): Todo[] => {
  if (action.type === ActionTypes.TodosSet) {
    return action.payload;
  }

  return state;
};

export default todosReducer;
