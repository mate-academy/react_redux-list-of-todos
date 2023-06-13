import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
