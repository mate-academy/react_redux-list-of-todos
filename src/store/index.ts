import { createStore, AnyAction } from 'redux';
import { State, Todo } from '../react-app-env';
import {
  LOAD_TODOS, SET_STATUS, SET_QUERY, TODOS_BY_QUERY,
} from './todo/actions';
import { LOAD_USER, CLEAR_USER } from './user/actions';

const initialState: State = {
  todos: [],
  status: 'all',
  query: '',
  user: null,
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_QUERY:
      return { ...state, query: action.query };
    case LOAD_TODOS:
      return { ...state, todos: [...action.todos] };
    case LOAD_USER:
      return { ...state, user: action.user };
    case CLEAR_USER:
      return { ...state, user: null };
    case TODOS_BY_QUERY: {
      const queryLoverCase = action.query.toLowerCase();
      const todos = state.todos.filter((todo: Todo) => (
        todo.title.toLowerCase().includes(queryLoverCase)));

      return { ...state, todos: [...todos] };
    }

    default:
      break;
  }

  return state;
};

const store = createStore(reducer);

export default store;
