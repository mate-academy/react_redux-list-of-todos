/* eslint-disable import/no-cycle */
import { Todo } from '../types/Todo';

type SetActionTodos = {
  type: 'todos/set';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetActionTodos => ({
  type: 'todos/set',
  payload: todos,
});

type State = Todo[];
type Action = SetActionTodos;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/set':

      return [...action.payload];

    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
