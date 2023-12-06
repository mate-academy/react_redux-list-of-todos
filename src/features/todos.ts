import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = SetTodosAction;

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: Action) => {
  switch (action.type) {
    case
      'todos/SET': return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
