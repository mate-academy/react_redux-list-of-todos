import { Todo } from '../types/Todo';

const ACTION_SET_TODOS = 'todos/SET';

type SetTodosAction = {
  type: typeof ACTION_SET_TODOS;
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: ACTION_SET_TODOS,
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case ACTION_SET_TODOS:
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
