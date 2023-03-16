import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodoAction = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodoAction };

type Action = SetTodoAction;

const initialTodos: Todo[] = [];

const todosReducer = (todos: Todo[] = initialTodos, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
