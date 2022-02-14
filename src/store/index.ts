import { createStore } from 'redux';
import {
  CLEAR_USER,
  LOAD_TODOS,
  LOAD_USER,
  INPUT_VALUE,
  SELECT_VALUE,
} from './actions';

const initialState: State = {
  todos: [],
  user: null,
  inputValue: '',
  selectValue: '',
};

const reducer = (state = initialState, action: Action) => {
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

    case INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    case SELECT_VALUE:
      return {
        ...state,
        selectValue: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
