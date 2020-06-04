import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

const SET_SORT_FIELD = 'SET_SORT_FIELD';
const SET_TODOS = 'SET_TODOS';
const SET_ORDER = 'SET_ORDER';
const DELETE_ITEM = 'DELETE_ITEM';

export const setSortField = (sortField: string) => ({
  type: SET_SORT_FIELD,
  sortField,
});

export const setDeleteItem = (deleteItem: number) => ({
  type: DELETE_ITEM,
  deleteItem,
});

export const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  todos,
});

export const setOrder = (order: '' | 'ASC' | 'DES') => ({
  type: SET_ORDER,
  order,
});

export const getSortField = (state: RootState) => state.sortField;
export const getTodos = (state: RootState) => state.todos;
export const getOrder = (state: RootState) => state.order;

export const getSortedTodos = createSelector(
  [
    getTodos,
    getSortField,
    getOrder,
  ],
  (todos: Todo[], sortField: string, order: string) => {
    const visibleTodos = [...todos];
    console.log(order);
    switch (sortField) {
      case 'id':
        visibleTodos.sort((a, b) => a.id - b.id);
        break;
      case 'title':
        visibleTodos.sort((a, b) => a[sortField].localeCompare(b[sortField]));
        break;
      case 'status':
        visibleTodos.sort((a, b) => +a.completed - +b.completed);
        break;
      case 'username':
        visibleTodos.sort((a: Todo, b: Todo) => {
          if (a.user && b.user) {
            return a.user.username.localeCompare(b.user.username);
          }

          return 0;
        });

        break;
      default: break;
    }

    if (order === 'DES') {
      visibleTodos.reverse();
    }

    return visibleTodos;
  },
);

export type RootState = {
  todos: Todo[];
  sortField: string;
  order: '' | 'ASC' | 'DES';
};

const initialState: RootState = {
  todos: [],
  sortField: 'id',
  order: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.order,
      };
    case DELETE_ITEM:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.deleteItem),
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
