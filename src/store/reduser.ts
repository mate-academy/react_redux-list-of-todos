import { AnyAction } from 'redux';
import { ActionTypes, FilterTypes } from './types';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

const {
  TODOS_LOAD,
  SET_VISIBILITY_FILTER,
  RANDOMIZE_TODOS,
  LOAD_USER,
  CLEAR_USER,
  DELETE_TODO,
  TOGGLE_COMPLETED,
} = ActionTypes;

const initialState = {
  todos: [],
  visibilityFilter: FilterTypes.SHOW_ALL,
  currentUser: null,
};

interface State {
  todos: Todo[],
  visibilityFilter: string,
  currentUser: User | null,
}

export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case TODOS_LOAD:
      return {
        ...state,
        todos: action.payload.data,
      };

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload.filter,
      };

    case RANDOMIZE_TODOS:
      return {
        ...state,
        todos: [...state.todos].sort(() => Math.random() - 0.5),
      };

    case DELETE_TODO:
      return (() => {
        const { todos } = state;
        const filteredTodos = todos.filter(
          todo => todo.id !== action.payload.id,
        );

        return {
          ...state,
          todos: filteredTodos,
        };
      })();

    case TOGGLE_COMPLETED:
      return (() => {
        const { todos } = state;
        const newTodos = todos.map(
          todo => {
            const item = todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo;

            return item;
          },
        );

        return {
          ...state,
          todos: newTodos,
        };
      })();

    case LOAD_USER:
      return {
        ...state,
        currentUser: action.payload.data,
      };

    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};
