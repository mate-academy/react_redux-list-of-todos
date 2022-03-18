import { createStore, AnyAction } from 'redux';
import {
  SET_STATUS_VALUE,
  SET_TITLE_VALUE,
  LOAD_TODOS,
  LOAD_USER,
} from './actions';

// Initial state
const initialState: State = {
  todos: [],
  user: null,
  title: '',
  status: '',
};

// rootReducer - this function is called after dispatching an action
const reducer = (state = initialState, action: AnyAction) => {
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
    case SET_TITLE_VALUE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_STATUS_VALUE:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
