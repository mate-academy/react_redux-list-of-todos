import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'TODOS/SET'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'TODOS/SET',
  payload: todos,
});

export const actions = {
  setTodos,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'TODOS/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
