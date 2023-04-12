import { Todo } from '../types/Todo';

type Action = {
  type: 'SET/Todos',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): Action => ({
  type: 'SET/Todos',
  payload: todos,
});

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  if (action.type === 'SET/Todos') {
    return action.payload;
  }

  return state;
};

export const action = {
  setTodos,
};

export default todosReducer;
