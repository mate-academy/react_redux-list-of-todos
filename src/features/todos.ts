import { Todo } from '../types/Todo';

type Set = { type: 'todos/SET', payload: Todo[] };

type Actions = Set;

const setTodos = (todos: Todo[]): Set => (
  { type: 'todos/SET', payload: todos }
);

export const actions = { set: setTodos };

const todosReducer = (todos = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
