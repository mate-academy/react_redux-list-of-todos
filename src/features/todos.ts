import {
  Actions as TodoActions,
  FetchAction,
  Todo,
} from '../types/Todo';

const fetchTodos = (todos: Todo[]): FetchAction => ({
  type: 'todos/FETCH_TODOS',
  payload: todos,
});

export const actions = {
  fetchTodos,
};

const todosReducer = (
  todos: Todo[] = [],
  action: TodoActions,
): Todo[] => {
  switch (action.type) {
    case 'todos/FETCH_TODOS':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
