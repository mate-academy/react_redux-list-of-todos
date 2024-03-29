import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = {
  setTodos,
};

const defaultState: Todo[] = [];
// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state = defaultState, action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
