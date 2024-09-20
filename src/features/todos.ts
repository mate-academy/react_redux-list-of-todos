import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type InitialState = Todo[];

export const todoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: InitialState = [],
  action: SetTodosAction,
): InitialState => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export const action = { setTodos };
