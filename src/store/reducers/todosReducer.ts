import { TodosAction, TodosActionTypes, TodoState } from '../types/todos';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  selectedUserId: null,
  searchQuery: '',
  todoStatus: 'all',
};

export const todosReducer = (state = initialState, action: TodosAction): TodoState => {
  switch (action.type) {
    case TodosActionTypes.FETCH_TODOS:
      return {
        ...state,
        loading: true,
      };

    case TodosActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };

    case TodosActionTypes.FETCH_TODOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TodosActionTypes.SELECT_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case TodosActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case TodosActionTypes.SET_TODOS_STATUS:
      return {
        ...state,
        todoStatus: action.payload,
      };

    default:
      return state;
  }
};
