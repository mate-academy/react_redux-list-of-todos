import { Todo } from '../types/Todo';

const GET = 'todos/GET';

type SetTodosAction = {
  type: typeof GET,
  payload: Todo[]
};
type Action = SetTodosAction;

const setTodos = (value: Todo[]): SetTodosAction => (
  { type: GET, payload: value });

const isLoading = (value: boolean) => (
  { type: 'todos/LOADING', payload: value });

export const actions = { setTodos, isLoading };

const initialTodos: Todo[] = [];

const todosReducer = (todos = initialTodos, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
