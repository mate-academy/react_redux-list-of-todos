import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODO = 'SET_TODO';
const SET_TYPE = 'SET_TYPE';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const loadTodos = (todos: Todo[]) => ({
  type: SET_TODO,
  todos,
});
export const setsortedTodos = (typeOfSort: string) => ({ type: SET_TYPE, typeOfSort });

export const deleteTodo = (todoId: number) => ({
  type: DELETE_TODO,
  todoId,
});

const sortTodos = (todos: Todo[], typeOfSort: string) => {
  switch (typeOfSort) {
    case 'sortByTitle':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'sortByName':
      return [...todos].sort((a, b) => a.user.name.localeCompare(b.user?.name));

    case 'sortByCompleted':
      return [...todos].sort((a, b) => b.completed.toString()
        .localeCompare(a.completed.toString()));

    default:
      return todos;
  }
};

// Selectors
export const getLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => sortTodos(state.todos, state.sortBy);

// Initial state
export type RootState = {
  loading: boolean;
  todos: Todo[];
  sortBy: string;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  sortBy: '',
};

const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    case SET_TYPE:
      return {
        ...state,
        sortBy: action.typeOfSort,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => action.todoId !== todo.id),
      };
    case SET_TODO:
      return { ...state, todos: action.todos };
    case START_LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(rootReducer, composeWithDevTools());

export default store;
