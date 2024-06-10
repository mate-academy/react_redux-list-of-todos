import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET_TODOS'; payload: Todo[] };

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'todos/SET_TODOS',
    payload: todos,
  }),
};
// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
