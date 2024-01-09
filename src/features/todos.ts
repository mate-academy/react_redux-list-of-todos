import { Todo } from '../types/Todo';

export const actions = {};

export const setTodos = (todos: Todo[]) => ({
  type: 'SET_TODOS',
  payload: todos,
});

const todosReducer = (
  state = [],
  action: { type: string; payload?: Todo[] },
): Todo[] => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};

export default todosReducer;
