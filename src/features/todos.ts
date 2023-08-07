import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type ClearTodosAction = { type: 'todos/CLEAR' };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const clear = (): ClearTodosAction => ({ type: 'todos/CLEAR' });

type Action = SetTodosAction | ClearTodosAction;

export const actions = { setTodos, clear };

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    case 'todos/CLEAR':
      return [];

    default:
      return todos;
  }
};

export default todosReducer;
