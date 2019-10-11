import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  ADD_TODOS: 'TODOS_ADD',
  SWITCH_LOADING: 'LOADING_SWITCH',
  IS_LOADED: 'LOADED_IS',
  HAS_ERROR: 'ERROR_HAS',
  IS_SORT: 'IS_SORT',
  ADD_SORTED_TODOS: 'SORTED_TODOS_ADD',
  DELETE_TODO: 'TODO_DELETE',
};

export const deleteTodo = idTodo => ({
  type: ACTION_TYPES.DELETE_TODO,
  payload: idTodo,
});

export const addTodos = todos => ({
  type: ACTION_TYPES.ADD_TODOS,
  payload: todos,
});

export const addSortedTodos = todosSorted => ({
  type: ACTION_TYPES.ADD_SORTED_TODOS,
  payload: todosSorted,
});

export const switchLoading = isLoading => ({
  type: ACTION_TYPES.SWITCH_LOADING,
  payload: isLoading,
});

export const loaded = isLoadData => ({
  type: ACTION_TYPES.IS_LOADED,
  payload: isLoadData,
});

export const errorTodos = hasError => ({
  type: ACTION_TYPES.HAS_ERROR,
  payload: hasError,
});

export const sortTodos = () => ({
  type: ACTION_TYPES.IS_SORT,
});

export const getTodosUsers = () => (dispatch) => {
  dispatch(switchLoading(true));
  dispatch(loaded(true));
  dispatch(errorTodos(false));

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ])
    .then(([responseTodos, responseUsers]) => Promise
      .all([responseTodos.json(), responseUsers.json()]))
    .then(([todos, users]) => {
      const usersMapApi = users
        .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

      function getTodosWithUsers(todosArray, usersApi) {
        return todosArray.map(todo => ({
          ...todo,
          user: usersApi[todo.userId],
        }));
      }

      const preparedTodos = getTodosWithUsers(todos, usersMapApi);
      const sortedTodos = [...getTodosWithUsers(todos, usersMapApi)].sort((a, b) => a.title.localeCompare(b.title));

      dispatch(switchLoading(false));
      dispatch(addTodos(preparedTodos));
      dispatch(addSortedTodos(sortedTodos));
    })
    .catch(() => {
      dispatch(errorTodos(true));
      dispatch(switchLoading(false));
    });
};

const initialState = {
  todos: [],
  todosSorted: [],
  isLoading: false,
  isLoadData: false,
  hasError: false,
  isSorted: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODOS: {
      return {
        ...state,
        todos: [...action.payload],
      };
    }

    case ACTION_TYPES.DELETE_TODO: {
      const deleteTodoWithList = list => list
        .filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: deleteTodoWithList(state.todos),
        todosSorted: deleteTodoWithList(state.todosSorted),
      };
    }

    case ACTION_TYPES.ADD_SORTED_TODOS: {
      return {
        ...state,
        todosSorted: [...action.payload],
      };
    }

    case ACTION_TYPES.SWITCH_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ACTION_TYPES.IS_LOADED: {
      return {
        ...state,
        isLoadData: action.payload,
      };
    }

    case ACTION_TYPES.HAS_ERROR: {
      return {
        ...state,
        hasError: action.payload,
      };
    }

    case ACTION_TYPES.IS_SORT: {
      return {
        ...state,
        isSorted: !state.isSorted,
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
