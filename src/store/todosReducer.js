const defaultState = {
  todos: [],
  visibleTodos: [],
};

export const ADD_TODOS = 'ADD_TODOS';

export const SHOW_ALL_TODOS = 'SHOW_ALL_TODOS';
export const ONLY_ACTIVE_TODOS = 'ONLY_ACTIVE_TODOS';
export const ONLY_COMPLETED_TODOS = 'ONLY_COMPLETED_TODOS';

export const FILTER_TODOS_BY = 'FILTER_TODOS_BY';

export const todosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODOS:
      return {
        ...state, todos: [...action.payload], visibleTodos: [...action.payload],
      };

    case SHOW_ALL_TODOS:
      return {
        ...state, visibleTodos: [...state.todos],
      };

    case ONLY_ACTIVE_TODOS:
      return {
        ...state, visibleTodos: [...state.todos].filter(todo => !todo.completed),
      };

    case ONLY_COMPLETED_TODOS:
      return {
        ...state, visibleTodos: [...state.todos].filter(todo => todo.completed),
      };

    case FILTER_TODOS_BY:
      return {
        ...state,
        visibleTodos: [...state.todos]
          .filter(todo => todo.title.toLowerCase().includes(action.payload.toLowerCase())),
      };

    default:
      return state;
  }
};
