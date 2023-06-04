import { Todo } from '../types/Todo';

const SET_TODOS = 'setTodos';

type SetTodos = { type: 'setTodos', payload: Todo[] };

export const setTodos = (todos: Todo[]) => (
  { type: SET_TODOS, payload: todos }
);

const todosReducer = (
  state: Todo[] = [],
  action: SetTodos,
): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
