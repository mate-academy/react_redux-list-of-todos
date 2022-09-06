import { Todo } from '../types/Todo';

type Action = {
  type: 'SET_TODOS' | 'REMOVE_TODOS'
  payload: Todo[],
};

type State = Todo[] | null;

const removeTodos = () => ({ type: 'REMOVE_TODOS' });

const setTodo = (todos: Todo[]) => ({
  type: 'SET_TODOS',
  payload: todos,
});

export const todosActions = { setTodo, removeTodos };

const todosReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'REMOVE_TODOS':
      return null;
    default:
      return state;
  }
};

export default todosReducer;
