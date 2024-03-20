import { Todo } from '../types/Todo';

type SetTodos = { type: 'currentTodos/SET'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'currentTodos/SET',
  payload: todos,
});

export const actions = { setTodos };

export const todosReducer = (state: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'currentTodos/SET':
      return action.payload;

    default:
      return state;
  }
};
