import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo, User } from '../interface';

export const getSortedTodos: any = ({ todos, sortField }: any) => {
  const sortedTodos = [...todos];


  switch (sortField) {
    case 'name':
      sortedTodos.sort((a: any, b: any): any => a.user[sortField].localeCompare(b.user[sortField]));
      break;

    case 'title':
      sortedTodos.sort((a: any, b: any): any => a[sortField].localeCompare(b[sortField]));
      break;

    case 'completed':
      sortedTodos.sort((a: any, b: any): any => +a[sortField] - +b[sortField]);
      break;

    case 'id':
      sortedTodos.sort((a: any, b: any): any => a[sortField] - b[sortField]);
      break;

    default:
      break;
  }

  return sortedTodos;
};

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODOS = 'SET_TODOS';
const IS_LOADED = 'IS_LOADED';
const SORT_BY = 'SORT_BY';
const KILL = 'KILL';

// ActionCreators
export const setTodos = ({ users, todos }: any) => ({
  type: SET_TODOS,
  users,
  todos,
});
export const finishLoading = (message: string) => ({
  type: FINISH_LOADING,
  message,
});
export const setSortField = (sortField: string) => ({ type: SORT_BY, sortField });
export const killTodo = (id: number) => ({ type: KILL, id });
export const setLoaded = () => ({ type: IS_LOADED });
export const startLoading = () => ({ type: 'START_LOADING' });

// Selectors
export const getMessage = (state: RootState) => state.message;
export const getStateTodos = (state: RootState) => state.todos;
export const getState = (state: RootState) => state;
export const getLoading = (state: RootState) => state.loading;
export const getLoaded = (state: RootState) => state.loaded;


export type RootState = {
  loading: boolean;
  message: string;
  todos: Todo[];
  loaded: boolean;
  sortField: string;
};

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
  loaded: false,
  sortField: 'id',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos.map((todo: Todo) => ({
          ...todo,
          user: action.users.find((item: User) => todo.userId === item.id),
        })),
      };
    case IS_LOADED:
      return {
        ...state,
        loaded: true,
      };
    case SORT_BY:
      return {
        ...state,
        sortField: action.sortField,
      };
    case KILL:
      return {
        ...state,
        todos: state.todos.filter(item => action.id !== item.id),
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
