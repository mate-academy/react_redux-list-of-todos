import {
  FETCH_TODOS_REQUEST,
  FETCH_USERS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_USERS_SUCCESS,
  TODOS_REQUEST_ERROR,
  USERS_REQUEST_ERROR,
  TODO_COMPLETE,
  TODO_SORT,
  TODO_DELETE
} from '../actions/action-types';

const initialState = {
  todos: [],
  users: [],
  todosLoading: false,
  usersLoading: false,
  todosLoaded: false,
  usersLoaded: false,
  todosError: null,
  usersError: null,
};

const actionHandlers = {
  [FETCH_TODOS_REQUEST]: (state) => {
    return {
      ...state,
      todosLoading: true,
      todosLoaded: false,
    };
  },
  [FETCH_USERS_REQUEST]: (state) => {
    return {
      ...state,
      usersLoading: true,
      usersLoaded: false,
    };
  },
  [FETCH_TODOS_SUCCESS]: (state, action) => {
    return {
      ...state,
      todos: action.payload,
      todosLoading: false,
      todosLoaded: true,
    };
  },
  [FETCH_USERS_SUCCESS]: (state, action) => {
    return {
      ...state,
      users: action.payload,
      usersLoading: false,
      usersLoaded: true,
    };
  },
  [USERS_REQUEST_ERROR]: (state, action) => {
    return {
      ...state,
      usersError: action.payload,
    };
  },
  [TODOS_REQUEST_ERROR]: (state, action) => {
    return {
      ...state,
      todosError: action.payload,
    };
  },
  [TODOS_REQUEST_ERROR]: (state, action) => {
    return {
      ...state,
      todosError: action.payload,
    };
  },
  [TODO_COMPLETE]: (state, action) => {
    return {
      ...state,
      todos: toggleTodoHelper(state.todos, action.payload),
    };
  },
  [TODO_SORT]: (state, action) => {
    return {
      ...state,
      todos: sortTodoHelper(state.todos, action.payload),
    };
  },
  [TODO_DELETE]: (state, action) => {
    return {
      ...state,
      todos: deleteTodoHelper(state.todos, action.payload),
    };
  },
};
const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];

  return handler
    ? handler(state, action)
    : state;

};

const toggleTodoHelper = (todos, id) => {
  const newTodos = [...todos];
  let findIndex = null;
  const findItem = newTodos.find((todo, index) => {
    findIndex = index;
    return todo.id === id;
  });
  findItem.completed = !findItem.completed;
  newTodos[findIndex] = findItem;
  return newTodos;
};

const sortTodoHelper = (todos, sortParam) => {
  return [...todos].sort((a, b) => {
    const aSortParam = a[sortParam];
    const bSortParam = b[sortParam];
    if (aSortParam < bSortParam) {
      return -1;
    }
    if (aSortParam > bSortParam) {
      return 1;
    }
    return 0;
  });
};

const deleteTodoHelper = (todos, id) => {
  const newTodos = [...todos];
  const index = newTodos.findIndex(todo => {
    return todo.id = id;
  });
  newTodos.splice(index, 1);
  return newTodos;
};

export default reducer;
