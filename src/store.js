import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodosFromServer } from './api/getTodosFromServer';
import { getUsersFromServer } from './api/getUsersFromServer';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const SET_ACTIVE_COLUMN = 'SET_ACTIVE_COLUMN';
const SET_DIRECTION = 'SET_DIRECTION';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleSuccess = combinedTodos => ({
  type: HANDLE_SUCCESS,
  combinedTodos,
});
export const setActiveColumn = activeColumn => ({
  type: SET_ACTIVE_COLUMN,
  activeColumn,
});
export const setDirection = direction => ({
  type: SET_DIRECTION,
  direction,
});

export const loadDataFromServer = () => async(dispatch) => {
  dispatch(startLoading());

  try {
    const [todosData, usersData] = await Promise.all([
      getTodosFromServer(),
      getUsersFromServer(),
    ]);

    const combinedData = todosData.map(todo => ({
      ...todo,
      user: usersData.find(user => user.id === todo.userId),
    }));

    return dispatch(handleSuccess(combinedData));
  } catch (e) {
    dispatch(handleError());
  }

  return 1;
};
export const getIsLoading = state => state.isLoading;
export const getIsError = state => state.isError;
export const getCombinedTodos = state => state.combinedTodos;
export const getActiveColumn = state => state.activeColumn;
export const getDirection = state => state.direction;

const initialState = {
  combinedTodos: [],
  isLoading: false,
  isError: false,
  activeColumn: '',
  direction: 'asc',
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        combinedTodos: action.combinedTodos,
        isLoading: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case SET_ACTIVE_COLUMN:
      return {
        ...state,
        activeColumn: action.activeColumn,
      };

    case SET_DIRECTION:
      return {
        ...state,
        direction: action.direction,
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
