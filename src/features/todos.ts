import { Todo } from '../types/Todo';

type SetTodosActions = {
  type: 'todos/SET',
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosActions => ({
  type: 'todos/SET',
  payload: todos,
});

export const actionsTodos = { setTodos };

type StateTodo = Todo[] | [];
type Action = SetTodosActions;

const todosReducer = (state: StateTodo = [], action: Action): StateTodo => {
  switch (action.type) {
    case 'todos/SET':
      return [
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default todosReducer;
