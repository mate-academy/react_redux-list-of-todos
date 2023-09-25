import { Todo } from '../types/Todo';

const SET_TODOS = 'todos/SET';

type SetTodos = {
  type: typeof SET_TODOS,
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: SET_TODOS,
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodos;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
