import { createStore, AnyAction } from 'redux';
import { TodoWithUser } from './utils/types';

export const TYPE_SET_ERROR = 'error';
export const TYPE_SET_LOAD = 'loading';
export const TYPE_SET_SORT = 'sort';
export const TYPE_SET_NEW_TODOS = 'downloaded';
export const TYPE_DELETE_TODO = 'delete_item';


export interface Storage {
  isLoading: boolean;
  isError: string;
  todos: TodoWithUser[];
}


const initStore: Storage = {
  isLoading: false,
  isError: '',
  todos: [],
};

export const getLoading = (state: Storage) => state.isLoading;
export const getError = (state: Storage) => state.isError;
export const getTodos = (state: Storage) => state.todos;

export const setLoad = (value: boolean) => ({ type: TYPE_SET_LOAD, value });
export const setError = (value: string) => ({ type: TYPE_SET_ERROR, value });
export const setSort = (value: string) => ({ type: TYPE_SET_SORT, value });
export const setNewTodos = (value: TodoWithUser[]) => ({ type: TYPE_SET_NEW_TODOS, value });
export const deleteTodo = (value: number) => ({ type: TYPE_DELETE_TODO, value });


const reducer = (state: Storage | undefined, action: AnyAction): Storage => {
  if (state === undefined) {
    return { isLoading: false, isError: '', todos: [] };
  }

  switch (action.type) {
    case 'delete_item': {
      const newTodos = state.todos.filter(item => item.id !== action.value);

      return { ...state, todos: newTodos };
    }

    case 'loading': {
      return { ...state, isLoading: action.value };
    }

    case 'error': {
      return { ...state, isError: action.value };
    }

    case 'downloaded': {
      return { ...state, todos: action.value };
    }

    case 'sort': {
      const newTodos = [...state.todos];

      switch (action.value) {
        case 'title': {
          newTodos.sort((item1, item2) => item1.title.localeCompare(item2.title));

          return { ...state, todos: newTodos };
        }

        case 'ID': {
          newTodos.sort((item1, item2) => item1.id - item2.id);

          return { ...state, todos: newTodos };
        }

        case 'condition': {
          newTodos.sort((item1, item2) => (
            Number(item1.completed) - Number(item2.completed)
          ));

          return { ...state, todos: newTodos };
        }

        case 'name': {
          newTodos.sort((item1, item2) => {
            const a = item1.user ? item1.user.name : '';
            const b = item2.user ? item2.user.name : '';

            return a.localeCompare(b);
          });

          return { ...state, todos: newTodos };
        }

        default: {
          return state;
        }
      }
    }

    default: {
      return state;
    }
  }
};

export const store = createStore(reducer, initStore);
