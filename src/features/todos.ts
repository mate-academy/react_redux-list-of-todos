import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'currentTodos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'currentTodos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'currentTodos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
