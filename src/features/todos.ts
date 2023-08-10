import { Todo } from '../types/Todo';

type AddTodosType = {
  type: 'todo/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): AddTodosType => ({
  type: 'todo/SET',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: AddTodosType): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;

    default: return todos;
  }
};

export const actions = { setTodos };

export default todosReducer;
