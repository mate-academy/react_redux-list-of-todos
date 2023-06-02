import { Todo } from '../types/Todo';

const SET_TODOS = 'setTodos';

type SetTodos = { type: 'setTodos', playload: Todo[] };

export const setTodos = (todos: Todo[]) => (
  { type: SET_TODOS, playload: todos }
);

const todosReducer = (
  state: Todo[] = [],
  action: SetTodos,
): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.playload;

    default:
      return state;
  }
};

export default todosReducer;
