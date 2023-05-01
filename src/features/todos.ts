import { Todo } from '../types/Todo';

type SetTodos = { type: 'setTodos'; playload: Todo[]; };

export const setTodos
= (todos: Todo[]) => ({ type: 'setTodos', playload: todos });

export type StateTodos = Todo [];

type State = Todo[];
const initialState: State = [];

const todosReducer = (
  state: State = initialState,
  action: SetTodos,
): Todo[] => {
  switch (action.type) {
    case 'setTodos':
      return action.playload;

    default:
      return state;
  }
};

export default todosReducer;
