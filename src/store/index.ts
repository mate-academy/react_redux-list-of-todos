import { createStore, AnyAction } from 'redux';

const LOAD_TODOS = 'LOAD_TODOS';
const LOAD_USER = 'LOAD_USER';
const DELETE_TODO = 'DELETE_TODO';

export const loadTodos = (payload: Todo[]) => ({ type: LOAD_TODOS, payload });
export const loadUser = (payload: User) => ({ type: LOAD_USER, payload });
export const deleteTodo = (payload: number) => ({ type: DELETE_TODO, payload });

export const setTodos = (state: RootState) => state.todos;
export const setUser = (state: RootState) => state.user;
export const removeTodo = (state: RootState) => state.todos;

export type RootState = {
  todos: Todo[],
  user: User | null,
};

const initialState: RootState = {
  todos: [],
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
