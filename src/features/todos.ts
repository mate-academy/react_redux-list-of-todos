import { Todo } from '../types/Todo';

const SET = 'todos/SET';

interface SetTodos {
  type: 'todos/SET';
  payload: Todo[];
}

const setTodos = (todos: Todo[]) => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = SetTodos;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case SET:
      return action.payload;
    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
