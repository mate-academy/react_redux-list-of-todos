import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

type Actions = SetTodos;

const set = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/SET': return [...todos, ...action.payload];
    default: return todos;
  }
};

export default todosReducer;
