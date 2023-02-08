import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (payload: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default: return state;
  }
};

export default todosReducer;
