import { Todo } from '../types/Todo';

type LoadTodosAction = {
  type: 'todos/LOAD';
  payload: Todo[];
};
type ClearTodosAction = { type: 'todos/CLEAR' };
type Action = LoadTodosAction | ClearTodosAction;

const load = (todos: Todo[]): LoadTodosAction => ({
  type: 'todos/LOAD',
  payload: todos,
});
const clear = (): ClearTodosAction => ({ type: 'todos/CLEAR' });

export const actions = { load, clear };

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return [...todos, ...action.payload];

    case 'todos/CLEAR':
      return [];

    default:
      return todos;
  }
};

export default todosReducer;
