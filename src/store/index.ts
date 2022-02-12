import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOADING_TODOS, CHANGE_USER_ID, DELETE_TODO } from './actions';

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOADING_TODOS:
      return { ...state, todos: [...action.payload] };

    case CHANGE_USER_ID:
      return { ...state, selectedUserId: action.payload };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
