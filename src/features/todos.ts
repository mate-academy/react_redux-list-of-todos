import { Todo } from '../types/Todo';

export enum ActionType {
  Load = 'todos/LOAD',
}

type LoadAction = { type: ActionType.Load, payload: Todo[] };

type Action = LoadAction;

const load = (todos: Todo[]): LoadAction => ({
  type: ActionType.Load,
  payload: todos,
});

export const actions = { load };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case ActionType.Load:
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
