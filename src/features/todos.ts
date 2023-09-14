import { Todo } from '../types/Todo';

const setTodos = (todos: Todo[]) => ({ type: 'todos/SET', payload: todos });

export const actions = { setTodos };

type State = Todo[];
type Action = ReturnType<typeof setTodos>;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
