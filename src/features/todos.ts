import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/SET_TODOS',
  payload: Todo[],
};

type Action = SetTodoAction;

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
