import { TodosState, TodosActionTypes, TodosAction } from './types';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  selectedUserId: null,
  statusTodos: '',
};

export const todosReducer = (state = initialState, action: TodosAction): TodosState => {
  switch (action.type) {
    case TodosActionTypes.FETCH_TODOS:
    case TodosActionTypes.TOGGLE_STATUS_TODO:
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
    case TodosActionTypes.TOGGLE_STATUS_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TodosActionTypes.SELECT_USER:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case TodosActionTypes.DESELECT_USER:
      return {
        ...state,
        selectedUserId: null,
      };

    case TodosActionTypes.SET_STATUS_TODOS:
      return {
        ...state,
        statusTodos: action.payload,
      };

    case TodosActionTypes.TOGGLE_STATUS_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }

          return todo;
        }),
      };

    default:
      return state;
  }
};
