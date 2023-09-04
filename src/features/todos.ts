import { Todo } from '../types/Todo';

type ActionTodo = { type: string, payload: Todo[] };
const setTodos = (todos: Todo[]) => ({ type: 'todo/SET', payload: todos });

export const actions = { setTodos };

const todosReducer = (
  todos = [],
  action: ActionTodo,
): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
