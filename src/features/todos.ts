import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

type Actions = SetTodos;

const set = (value: Todo[]): SetTodos => (
  { type: 'todos/SET', payload: value });

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
