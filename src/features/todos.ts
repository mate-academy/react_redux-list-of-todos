import { Todo } from '../types/Todo';

type State = Todo[];

type SetTodosAction = {
  type: 'todos/set',
  payload: Todo[],
};

type Actions = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/set',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Actions,
): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;

    default:
      return state;
  }

  return state;
};

export default todosReducer;
