import { Todo } from '../type/Todo';

type SetTodosAction = {
  type: 'todos/set',
  payload: Todo[],
};

type FilterTodosAllAction = {
  type: 'todos/filter/all',
  payload: string,
};

type FilterTodosByCompletedAction = {
  type: 'todos/filter/completed',
  payload: string,
};

type FilterTodosByActiveAction = {
  type: 'todos/filter/active',
  payload: string,
};

type State = {
  todos: Todo[],
  filteredTodo: Todo[],
};

const initialState = {
  todos: [],
  filteredTodo: [],
};

type TodosActions = SetTodosAction
| FilterTodosAllAction
| FilterTodosByCompletedAction
| FilterTodosByActiveAction;

// eslint-disable-next-line max-len
export const todosReducer = (state: State = initialState, action: TodosActions) => {
  switch (action.type) {
    case 'todos/set':
      return {
        todos: action.payload,
        filteredTodo: action.payload,
      };

    case 'todos/filter/all':
      return {
        ...state,
        filteredTodo: state.todos.filter(
          todo => todo.title.includes(action.payload.toLowerCase()),
        ),
      };

    case 'todos/filter/completed':
      return {
        ...state,
        filteredTodo: state.todos.filter(
          todo => todo.completed
          && todo.title.includes(action.payload.toLowerCase()),
        ),
      };

    case 'todos/filter/active':
      return {
        ...state,
        filteredTodo: state.todos.filter(
          todo => !todo.completed
          && todo.title.includes(action.payload.toLowerCase()),
        ),
      };

    default:
      return state;
  }
};

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'todos/set',
    payload: todos,
  }),

  filterAllTodos: (query: string): FilterTodosAllAction => ({
    type: 'todos/filter/all',
    payload: query,
  }),

  filterByCompletedTodos: (query: string): FilterTodosByCompletedAction => ({
    type: 'todos/filter/completed',
    payload: query,
  }),

  filterByActiveTodos: (query: string): FilterTodosByActiveAction => ({
    type: 'todos/filter/active',
    payload: query,
  }),

};
