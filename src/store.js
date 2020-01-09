import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodos } from './todos';
import { getUsers } from './user';

const IS_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const DELETE_TODOS = 'DELETE_TODOS';
const IS_START = 'IS_START';

export const isLoading = () => ({ type: IS_LOADING });
export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS,
  todos,
});
export const todosDelete = item => ({
  type: DELETE_TODOS,
  item,
});

export const loadTodos = async(dispatch) => {
  dispatch(isLoading());

  const [todos, users] = await Promise.all([
    getTodos(),
    getUsers(),
  ]);

  dispatch(handleSuccess(todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }))));
  dispatch(isStart());
};

export const isStart = () => ({ type: IS_START });

const initialState = {
  todos: [],
  isLoading: false,
  isStart: false,
  handleSuccess: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isStart: true,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isLoading: false,
      };
    case IS_START:
      return {
        ...state,
        isLoading: false,
        isStart: true,
      };

    case DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.item),
      };
    default:
      return state;
  }
};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
