export const SORT_ORDER_COMPLETED = 'SORT_COMPLETED';
export const SORT_ORDER_TITLE = 'SORT_TITLE';
export const SORT_ORDER_USER = 'SORT_USER';
export const SET_TODOS = 'SET_TODOS';
const REMOVE_TODO = 'REMOVE_TODO';

export const setTodos = todos => ({
  type: SET_TODOS,
  todos,
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
});

export const sortByCompleted = () => ({
  type: SORT_ORDER_COMPLETED,
});

export const sortByTitle = () => ({
  type: SORT_ORDER_TITLE,
});

export const sortByUser = () => ({
  type: SORT_ORDER_USER,
});

const sortedTodosReducer = (state = [], action) => {
  const { sortedTodos = [], initialTodos = [], sortField: { fieldDirection } = 1 } = state;
  const newSortDirection = fieldDirection === 1 ? -1 : 1;
  switch (action.type) {
    case SET_TODOS:
      return {
        sortField: {
          name: '',
          fieldDirection: 1,
        },
        sortedTodos: action.todos,
        initialTodos: action.todos,
      };
    case REMOVE_TODO:
      return {
        ...state,
        sortedTodos: sortedTodos
          .filter(todo => todo.id !== action.id),
        initialTodos: initialTodos
          .filter(todo => todo.id !== action.id),
      };
    case SORT_ORDER_TITLE:
      return {
        ...state,
        sortField: {
          name: action.type,
          fieldDirection: newSortDirection,
        },
        sortedTodos: [...initialTodos]
          .sort((a, b) => a.title.localeCompare(b.title)
            * fieldDirection),
      };
    case SORT_ORDER_USER:
      return {
        ...state,
        sortField: {
          name: action.type,
          fieldDirection: newSortDirection,
        },
        sortedTodos: [...initialTodos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)
            * fieldDirection),
      };
    case SORT_ORDER_COMPLETED:
      return {
        ...state,
        sortField: {
          name: action.type,
          fieldDirection: newSortDirection,
        },
        sortedTodos: [...initialTodos]
          .sort((a, b) => (b.completed - a.completed)
            * fieldDirection),
      };
    default:
      return state;
  }
};

export default sortedTodosReducer;
