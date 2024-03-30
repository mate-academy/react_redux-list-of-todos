import { Todo } from '../types/Todo';

const FETCH = 'todos/fetch';

type UpdateAction = {
  type: typeof FETCH;
  payload: {
    todos: Todo[];
  };
};

const updateTodos = (todos: Todo[]): UpdateAction => ({
  type: FETCH,
  payload: {
    todos,
  },
});

export const actions = { updateTodos };

const todosReducer = (todos: Todo[] = [], action: UpdateAction): Todo[] => {
  switch (action.type) {
    case FETCH:
      return action.payload.todos;
    default:
      return todos;
  }
};

export default todosReducer;
