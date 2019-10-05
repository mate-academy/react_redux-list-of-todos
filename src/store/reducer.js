import {
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_SORT,
  TODO_ITEM_DELETE,
} from './constants';

const todosWithoutDelElem = (todos, todoId) => {
  const deletedItemIndex = todos.findIndex(todo => todo.id === todoId);
  return [
    ...todos.slice(0, deletedItemIndex),
    ...todos.slice(deletedItemIndex + 1),
  ];
};

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
        todosListFromServer: action.todosListFromServer,
        todosList: action.todosListFromServer,
        sortedTodosList: action.todosListFromServer,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        buttonText: 'try again',
        isLoaded: false,
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
          sortedTodosList: [...state.todosListFromServer],
          todosList: [...state.todosListFromServer],
        };
      }

    case TODO_ITEM_DELETE:
      return {
        ...state,
        todosList: todosWithoutDelElem(state.todosList, action.todoId),
        sortedTodosList: todosWithoutDelElem(
          state.sortedTodosList,
          action.todoId
        ),
      };

    default: return state;
  }
};

export default reducer;
