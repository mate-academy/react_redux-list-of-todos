import { AnyAction } from 'redux';
import {
  TYPE_LOADING,
  TYPE_SET_TODOS,
  TYPE_SORT,
  TYPE_DELETE,
} from '../actions/actions';

const initialState: State = {
  todos: [],
  isLoading: false,
  sortBy: '',
};


export const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TYPE_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case TYPE_SET_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case TYPE_SORT: {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    case TYPE_DELETE: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    default: return state;
  }
};
