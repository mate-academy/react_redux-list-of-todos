import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD',
  payload: Todo[],
};

type ClearTodosAction = {
  type: 'todos/CLEAR',
};

type Action = AddTodosAction
| ClearTodosAction;

type State = Todo[];

const add = (todos: Todo[]): AddTodosAction => (
  { type: 'todos/ADD', payload: todos }
);
const clear = (): ClearTodosAction => ({ type: 'todos/CLEAR' });

const todosReducer = (
  value: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    case 'todos/CLEAR':
      return [];

    default:
      return value;
  }
};

export const actions = { add, clear };

export default todosReducer;
