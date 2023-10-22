import { Todo } from '../types/Todo';

type LoadTodosAction = { type: 'todos/LOAD', payload: Todo[] };

const loadTodos = (todos: Todo[]): LoadTodosAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { loadTodos };

type TodosAction = LoadTodosAction;

const todosReducer = (
  todos: Todo[] = [],
  action: TodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
