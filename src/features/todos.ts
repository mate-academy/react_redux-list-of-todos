import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/GET',
  payload: Todo[],
};

const setTodos = (value: Todo[]): SetTodosAction => (
  { type: 'todos/GET', payload: value });

export const actions = { setTodos };

const initialTodos: Todo[] = [];

const todosReducer = (todos = initialTodos, action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
