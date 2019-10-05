import {
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_SORT,
} from './constants';

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        buttonText: 'loading...',
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todosList: action.todosList,
        sortedTodosList: action.todosList,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        buttonText: 'try again',
        isError: true,
        isLoading: false,
      };

    case HANDLE_SORT:
      switch (action.typeOfSort) {
        case 'name':
          return {
            ...state,
            sortedTodosList: [...state.todosList]
              .sort((todo1, todo2) => (
                todo1.user.name.localeCompare(todo2.user.name))),
          };

        case 'title': return {
          ...state,
          sortedTodosList: [...state.todosList]
            .sort((todo1, todo2) => todo1.title.localeCompare(todo2.title)),
        };

        case 'completed': return {
          ...state,
          sortedTodosList: [
            ...state.todosList.filter(todo => todo.completed),
            ...state.todosList.filter(todo => !todo.completed),
          ],
        };

        default: return {
          ...state,
          sortedTodosList: [...state.todosList],
        };
      }

    default: return state;
  }
};

export default reducer;
