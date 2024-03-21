/* eslint-disable */
import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };

type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[] | [];

const todosReducer = (todos: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
