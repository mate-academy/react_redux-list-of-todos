import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];

const todosReducer = (
  todos: State = [],
  action: SetTodosAction = {} as SetTodosAction,
): Todo[] => {
  if (action.type === 'todos/SET') {
    return [...action.payload];
  }

  return todos;
};

export default todosReducer;
