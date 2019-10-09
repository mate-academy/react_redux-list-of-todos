export const LOAD = 'LOAD';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const HANDLE_REMOVE = 'HANDLE_REMOVE';
export const HANDLE_SORT = 'HANDLE_SORT';

export const startLoading = () => ({ type: LOAD });
export const handleSuccess = todosWithUsers => ({
  type: HANDLE_SUCCESS,
  todosWithUsers,
});
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleRemove = id => ({
  type: HANDLE_REMOVE,
  payload: id,
});
export const handleSort = e => ({
  type: HANDLE_SORT,
  payload: e,
});

export const initialState = {
  isLoading: false,
  hasError: false,
  disabled: false,
  todosWithUsers: [],
  // sortedTodos: [],
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todosWithUsers: action.todosWithUsers,
        isLoading: false,
        hasError: false,
        disabled: true,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case HANDLE_REMOVE:
      return {
        todosWithUsers: [...state.todosWithUsers]
          .filter(todo => todo.id !== action.payload),
      };

    case HANDLE_SORT:
      switch (action.payload) {
        case 'By user':
          return {
            ...state,
            todosWithUsers: [...state.todosWithUsers]
              .sort((a, b) => a.user.username.localeCompare(b.user.username)),
          };

        case 'By title':
          return {
            ...state,
            todosWithUsers: [...state.todosWithUsers]
              .sort((a, b) => a.title.localeCompare(b.title)),
          };

        case 'By status':
          return {
            ...state,
            todosWithUsers: [...state.todosWithUsers]
              .sort((a, b) => a.completed - b.completed),
          };

        default:
          return state;
      }

    default:
      return state;
  }
};
