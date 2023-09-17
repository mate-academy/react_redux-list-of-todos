type SetFilterAll = {
  type: 'currentTodo/All',
};

type SetFilterActive = {
  type: 'currentTodo/ACTIVE',
};

type SetFilterCompleted = {
  type: 'currentTodo/COMPLETED',
};

type SetFilterQuery = {
  type: 'currentTodo/SET_QUERY',
  payload: string,
};

const setFilterQuery = (query: string): SetFilterQuery => ({
  type: 'currentTodo/SET_QUERY',
  payload: query,
});

const setActiveTodo = (): SetFilterActive => ({
  type: 'currentTodo/ACTIVE',
});

const setCompletedTodo = (): SetFilterCompleted => ({
  type: 'currentTodo/COMPLETED',
});

const setAllTodos = (): SetFilterAll => ({
  type: 'currentTodo/All',
});

const initialState = {
  query: '',
  status: 'all',
};

export const filterActions = {
  setActiveTodo, setCompletedTodo, setAllTodos, setFilterQuery,
};

  type Action = SetFilterActive
  | SetFilterCompleted
  | SetFilterAll
  | SetFilterQuery;

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'currentTodo/ACTIVE':
      return { ...state, status: 'active' };
    case 'currentTodo/COMPLETED':
      return { ...state, status: 'completed' };
    case 'currentTodo/All':
      return { ...state, status: 'all' };
    case 'currentTodo/SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
