import { Todo } from '../types/Todo';

export type AddTodosAction = { type: 'todos/ADD', payload: Todo[] };

export const addTodos = (todos: Todo[]) => (
  { type: 'todos/ADD', payload: todos }
);

type StateType = Todo[] | [];

const todosReducer = (
  state: StateType = [],
  action: AddTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
