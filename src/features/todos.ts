// import { getTodos } from '../api';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todo/SET';
  payload: Todo[];
};

type FilterTodoAction = {
  type: 'todo/FILTER';
  payload: Filter;
};

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todo/SET',
  payload: todos,
});

const filterTodos = (filter: Filter): FilterTodoAction => ({
  type: 'todo/FILTER',
  payload: filter,
});

type Action = SetTodoAction | FilterTodoAction;

export const actions = { setTodos, filterTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
