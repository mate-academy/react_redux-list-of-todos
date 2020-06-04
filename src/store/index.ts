import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

export const setSortField = (sortField: string) => ({
  type: 'SET_SORT_FIELD',
  sortField,
});

export const setDeleteItem = (deleteItem: number) => ({
  type: 'DELETE_ITEM',
  deleteItem,
});

export const setTodos = (todos: Todo[]) => ({
  type: 'SET_TODOS',
  todos,
});

export const getSortField = (state: RootState) => state.sortField;
export const getTodos = (state: RootState) => state.todos;

export const getSortedTodos = createSelector(
  [
    getTodos,
    getSortField,
  ],
  (todos: Todo[], sortField: string) => {
    const visibleTodos = [...todos];

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

    return visibleTodos;
  },
);

export type RootState = {
  todos: Todo[];
  sortField: string;
};

const initialState: RootState = {
  todos: [],
  sortField: 'id',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_SORT_FIELD':
      return {
        ...state,
        sortField: action.sortField,
      };
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.todos,
      };
    case 'DELETE_ITEM':
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
