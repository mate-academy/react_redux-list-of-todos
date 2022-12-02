import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET',
  payload: Todo[]
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (state: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
