import { ACTION_TYPES } from './Actions';

const initialState = {
  isLoading: false,
  error: false,
  initialized: false,
  preparedTodos: null,
};

function prepare(preparedTodos) {
  const [todos, users] = preparedTodos;

  if (todos && users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));
  }

  return [];
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SAVE: {
      const { payload } = action;

      return {
        ...state,
        error: false,
        preparedTodos: prepare(payload),
      };
    }

    case ACTION_TYPES.SET_LOAD_ERROR: {
      return {
        ...state,
        error: true,
        preparedTodos: [],
      };
    }

    case ACTION_TYPES.START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPES.STOP_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ACTION_TYPES.DELETE_TODO: {
      const { todoId } = action;

      return {
        ...state,
        preparedTodos: state.preparedTodos.filter(item => item.id !== todoId),
      };
    }

    case ACTION_TYPES.SORT_TODOS: {
      const { payload } = action;

      // debugger;

      switch (payload) {
        case 'byUser':
          return {
            ...state,
            preparedTodos: state.preparedTodos.sort(
              (a, b) => a.user.name.localeCompare(b.user.name)
            ),
          };
        case 'byTitle':
          return {
            ...state,
            preparedTodos: state.preparedTodos.sort(
              (a, b) => a.title.localeCompare(b.title)
            ),
          };
        case 'byStatus':
          return {
            ...state,
            preparedTodos: state.preparedTodos.sort(
              (a, b) => a.completed - b.completed
            ),
          };
        default:
          return {
            ...state,
            preparedTodos: state.preparedTodos,
          };
      }
    }

    default:
      return state;
  }
}
