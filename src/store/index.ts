import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const TODOS_LOADING = 'TODOS_LOADING';
const USER_LOADING = 'USER_LOADING';
const SELECT_USER_ID = 'SELECT_USER_ID';
const DELETE_TODO = 'DELETE_TODO';

export const todosLoading = (todos: Todo[]) => ({
  type: TODOS_LOADING,
  todos,
});

export const userLoading = (user: User | null) => ({
  type: USER_LOADING,
  user,
});

export const selectUserId = (selectedUserId: number) => ({
  type: SELECT_USER_ID,
  selectedUserId,
});

export const deleteTodo = (deleteTodoId: number) => ({
  type: DELETE_TODO,
  deleteTodoId,
});

export const getTodosSelector = (state: RootState) => state.todos;
export const getUserSelector = (state: RootState) => state.user;
export const getUserIdSelector = (state: RootState) => state.selectedUserId;

export type RootState = {
  todos: Todo[];
  user: User | null;
  selectedUserId: number;
};

const initialState: RootState = {
  todos: [],
  user: null,
  selectedUserId: 0,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TODOS_LOADING: {
      return {
        ...state,
        todos: [...action.todos],
      };
    }

    case USER_LOADING: {
      return {
        ...state,
        user: action.user,
      };
    }

    case SELECT_USER_ID: {
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.deleteTodoId),
      };
    }

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
