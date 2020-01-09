import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadTodosFromServer } from './api/getTodos';
import { loadUsersFromServer } from './api/getUsers';

const START_LOADING = 'START_LOADING';
const SET_DATA = 'SET_DATA';
const SET_SORTEDBY = 'SET_SORTEDBY';
const SET_ORDER = 'SET_ORDER';

export const startLoading = () => ({ type: START_LOADING });
export const setData = todosWithUsers => ({
  type: SET_DATA,
  todosWithUsers,
});
export const setSortedBy = activeColumn => ({
  type: SET_SORTEDBY,
  activeColumn,
});
export const setOrder = order => ({
  type: SET_ORDER,
  order,
});

export const loadDataFromServer = () => async(dispatch) => {
  dispatch(startLoading());

  const [todos, users] = await Promise.all([
    loadTodosFromServer(),
    loadUsersFromServer(),
  ]);

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  return dispatch(setData(todosWithUsers));
};

export const getIsLoading = state => state.isLoading;
export const getTodos = state => state.todosWithUsers;
export const getActiveColumn = state => state.activeColumn;
export const getOrder = state => state.order;

const initialState = {
  todosWithUsers: [],
  isLoading: false,
  activeColumn: '',
  direction: 'asc',
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_DATA:
      return {
        ...state,
        isLoading: false,
        todosWithUsers: action.todosWithUsers,
      };
    case SET_SORTEDBY:
      return {
        ...state,
        activeColumn: action.activeColumn,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
