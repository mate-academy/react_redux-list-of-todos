import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const INIT_TODOS = 'INIT_TODOS';
const SET_SORT_TYPE = 'SET_SORT_TYPE';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const initTodos = (todos: Todo[]) => ({
  type: INIT_TODOS,
  todos,
});
export const setSortType = (sortType: string) => ({ type: SET_SORT_TYPE, sortType });

export const deleteTodo = (todoId: number) => ({
  type: DELETE_TODO,
  todoId,
});

const sortTodos = (todos: Todo[], sortType: string, sortOrder: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    case 'userName':
      return [...todos].sort((a, b) => (sortOrder === 'asc'
        ? a.user?.name.localeCompare(b.user?.name ?? '') ?? 0
        : b.user?.name.localeCompare(a.user?.name ?? '')) ?? 0);

    case 'id':
      return [...todos].sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));

    default:
      return todos;
  }
};

// Selectors
export const getLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => sortTodos(state.todos, state.sortBy, state.sortOrder);
export const getSortType = (state: RootState) => state.sortBy;

// Initial state
export type RootState = {
  loading: boolean;
  todos: Todo[];
  sortBy: string;
  sortOrder: string;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  sortBy: '',
  sortOrder: '',
};

const rootReducer = (state = initialState, action: AnyAction): RootState => {
  const orders = ['desc', 'asc'];

  switch (action.type) {
    case SET_SORT_TYPE:
      return {
        ...state,
        sortBy: action.sortType,
        sortOrder: action.sortType === state.sortBy ? orders[((orders.indexOf(state.sortOrder) + 1) % orders.length)] : 'desc',
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => action.todoId !== todo.id),
      };
    case INIT_TODOS:
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
