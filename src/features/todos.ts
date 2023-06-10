import { Todo } from '../types/Todo';

export enum ActionType {
  load = 'todos/LOAD',
}

type SetTodos = { type: ActionType.load, payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: ActionType.load,
  payload: todos,
});

type Action = SetTodos;

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case ActionType.load:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
