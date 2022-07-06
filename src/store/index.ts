import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo, User, RootState } from '../components/types/type';

// Action types - is just a constant. MUST have a unique value.
const SET_TODOS = 'SET_TODOS';
const SET_USER = 'SET_USER';
const DELETE_TODO = 'delete';
const SELECTED_ID = 'selected_id';

// Action creators - a function returning an action object
export const setTodosAction = (payload: Todo[]): AnyAction => (
  {
    type: SET_TODOS,
    payload,
  });

export const setUserAction = (payload: User | null): AnyAction => (
  {
    type: SET_USER,
    payload,
  });

export const setSelectedTodoId = (todoId: number): AnyAction => (
  {
    type: SELECTED_ID,
    todoId,
  }
);

export const setDeleteTodoAction = (todoId: number): AnyAction => (
  {
    type: DELETE_TODO,
    todoId,
  }
);

// Initial state

export const initialState: RootState = {
  todos: [],
  user: null,
  todoId: 0,
};

// Selectors - a function receiving Redux state and returning some data from it
export const getTodosSelector = (state: RootState) => state.todos;
export const getUserSelector = (state: RootState) => state.user;
export const getSelectedTodoId = (state: RootState) => state.todoId;

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SELECTED_ID:
      return { ...state, todoId: action.todoId };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
