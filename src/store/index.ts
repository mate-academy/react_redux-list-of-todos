import { createStore } from 'redux';
import { State, Action } from '../react-app-env';
import {
  INPUT_VALUE,
  LOAD_TODOS,
  LOAD_USER,
  SELECTED_USER_ID,
  SELECT_VALUE,
} from './actions';

const initialState: State = {
  todos: [],
  user: null,
  inputValue: '',
  selectValue: '',
  selectedUserId: 0,
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
    case SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
