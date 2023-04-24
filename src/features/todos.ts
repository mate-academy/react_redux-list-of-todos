import { Todo } from '../types/Todo';

export const actions = {};

type AddTodos = {
  type: 'todos/ADD';
  payload: Todo[];
};

export const addTodos = (todos: Todo[]): AddTodos => ({
  type: 'todos/ADD',
  payload: todos,
});

type Action = AddTodos;
type State = [] | Todo[];

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
