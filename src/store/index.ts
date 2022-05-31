import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const TODOS_LOADING = 'TODOS_LOADING';
const USER_LOADING = 'USER_LOADING';
const SELECT_ID = 'SELECT_ID';

export const todosLoadingAction = (todos: Todo[]) => ({
  type: TODOS_LOADING,
  todos,
});
export const userLoadingAction = (user: User) => ({
  type: USER_LOADING,
  user,
});
export const idSelectAction = (id: number) => ({
  type: SELECT_ID,
  id,
});

export const getTodosSelector = (state: RootState) => state.todos;
export const getSelectedUserByIdSelector
 = (state: RootState) => state.selectedUserById;
export const getCurrentUserSelector = (state: RootState) => state.user;

export type RootState = {
  todos: Todo[];
  selectedUserById: number;
  user: User | null;
};

const initialState: RootState = {
  todos: [],
  selectedUserById: 0,
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        todos: [...state.todos, ...action.todos],
      };

    case USER_LOADING:
      return {
        ...state,
        user: action.user,
      };

    case SELECT_ID:
      return {
        ...state,
        selectedUserById: action.id,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
