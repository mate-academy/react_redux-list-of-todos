import { Todo } from '../types/Todo';

type State = Todo[] | [];

type SetAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type Action = SetAction;

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

export const todosReducer = (
  todos: State = [],
  { type, payload }: Action,
): Todo[] => {
  switch (type) {
    case 'todos/SET':
      return [...todos, ...payload];

    default:
      return todos;
  }
};
