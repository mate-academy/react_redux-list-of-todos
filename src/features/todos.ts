import { Todo } from '../types/Todo';

const SET = 'todos/SET';

type SetTodos = {
  type: typeof SET,
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: SET,
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodos;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case SET:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
