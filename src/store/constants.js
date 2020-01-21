export const initialState = {
  todosListFromServer: [],
  todosList: [],
  sortedTodosList: [],
  isLoaded: false,
  isLoading: false,
  isError: false,
  buttonText: 'Load',
};

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const HANDLE_SORT = 'HANDLE_SORT';
export const TODO_ITEM_DELETE = 'TODO_ITEM_DELETE';
