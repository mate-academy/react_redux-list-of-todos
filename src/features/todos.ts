import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export const setTodos = (todos: Todo[]) => ({
  type: 'todos/SET',
  payload: todos,
});

// export const actions = { setTodos };

type State = Todo[];

const todosReducer = (state: State = [], action: SetTodosAction): Todo[] => {
  if (action.type === 'todos/SET' && state) {
    return state;
  }

  return [];
};

export default todosReducer;
