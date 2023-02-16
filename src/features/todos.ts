import { Todo } from '../types/Todo';

type SetTodoAction = { type: 'todos/SET_TODOS', payload: Todo[] };
type RemoveTodosAction = { type: 'todos/REMOVE_TODOS' };

type Action = SetTodoAction | RemoveTodosAction;

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

const removeTodos = (): RemoveTodosAction => ({
  type: 'todos/REMOVE_TODOS',
});

export const actions = { setTodos, removeTodos };

type State = Todo[] | [];

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return action.payload;

    case 'todos/REMOVE_TODOS':
      return [];

    default:
      return state;
  }
};

export default todosReducer;
