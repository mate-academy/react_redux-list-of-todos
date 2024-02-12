import { Todo } from '../types/Todo';

enum ActionType {
  Set = 'todos/SET',
}

type SetAction = { type: ActionType.Set, payload: Todo[] };

type Action = SetAction;

const set = (todos: Todo[]) => ({ type: ActionType.Set, payload: todos });

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { set };

export default todosReducer;
