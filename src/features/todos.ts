import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'currentTodos/SET',
  payload: Todo[],
};

const setTodos = (newTodos: Todo[]): SetTodosAction => ({
  type: 'currentTodos/SET',
  payload: newTodos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodosAction,
): Todo[] => {
  if (action.type === 'currentTodos/SET') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
