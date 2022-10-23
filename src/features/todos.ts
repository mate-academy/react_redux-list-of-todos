import { Todo } from '../types/Todo';

// eslint-disable-next-line @typescript-eslint/naming-convention
type setTodosAction = {
  type: 'SET_TODOS',
  payload: Todo[],
};

const setTodos = (Todos: Todo[]): setTodosAction => ({
  type: 'SET_TODOS',
  payload: Todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: setTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
