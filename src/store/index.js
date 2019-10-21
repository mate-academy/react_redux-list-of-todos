import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getData } from '../api/data';

const ACTION_TYPES = {
  LOADI_TODOS_REQUEST: 'LOADI_TODOS_REQUEST',
  LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS',
  GET_DATA: 'GET_DATA',
};

export const loading = () => ({
  type: ACTION_TYPES.LOADI_TODOS_REQUEST,
});
export const loaded = () => ({
  type: ACTION_TYPES.LOAD_TODOS_SUCCESS,
});
const getPreparedData = (todos, users) => ({
  type: ACTION_TYPES.GET_DATA,
  todos,
  users,
});

export const loadData = () => (dispatch) => {
  dispatch(loading());

  Promise.all([getData('todos'), getData('users')])
    .then(([todos, users]) => {
      dispatch(loading());
      dispatch(getPreparedData(todos, users));
      dispatch(loaded());
    });
};

const initialState = {
  isLoading: false,
  isLoaded: false,
  todos: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOADI_TODOS_REQUEST: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case ACTION_TYPES.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    }
    case ACTION_TYPES.GET_DATA: {
      return {
        ...state,
        todos: action.todos.map(todo => ({
          ...todo,
          user: action.users.find(item => item.id === todo.userId),
        })),
      };
    }
    default: {
      return state;
    }
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
