import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export const setTodos = (todos: Todo[]) => ({
  type: 'todos/SET',
  payload: todos,
});

export const getTodos = () => ({ type: 'todos/GET' });
export const actions = { setTodos, getTodos };

type State = Todo[];

const todosReducer = (state: State = [], action: SetTodosAction): Todo[] => {
  if (action.type === 'todos/SET') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
