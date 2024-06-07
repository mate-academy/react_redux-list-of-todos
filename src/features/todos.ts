import { Todo } from '../types/Todo';

type SetTodoAction = { type: 'todos/SET_TODOS'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodoAction;

const initState: Todo[] = [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state = initState, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
