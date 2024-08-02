import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => {
  return {
    type: 'todos/SET',
    payload: todos,
  };
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const todosReducer = (todos: Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { setTodos };
