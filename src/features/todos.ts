import { Todo } from '../types/Todo';

type SetTodos = { type: 'setTodos', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'setTodos',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodos;

const todosReducer = (state = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'setTodos':
      return action.payload;

    default: return state;
  }
};

export default todosReducer;
