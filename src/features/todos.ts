import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/SET_TODO',
  playload: Todo[],
};

const setTodo = (arr: Todo[]): SetTodoAction => ({
  type: 'todos/SET_TODO',
  playload: arr,
});

export const actions = { setTodo };

const initialTodos: Todo[] = [];

type Action = SetTodoAction;

const todosReducer = (
  state = initialTodos,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODO':
      return [...action.playload, ...state];
    default:
      return [...state];
  }
};

export default todosReducer;
