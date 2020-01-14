import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodos, getUsers } from '../api/getData';

const START_LOAD = 'START_LOAD';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_DELETE = 'HANDLE_DELETE';

export const startLoad = () => ({ type: START_LOAD });

export const handleSuccess = todoList => ({
  type: HANDLE_SUCCESS, todoList,
});

export const handleDelete = payload => ({
  type: HANDLE_DELETE, payload,
});

export const loadTodos = () => async(dispatch) => {
  dispatch(startLoad());

  const [
    todosFromServer,
    usersFromServer,
  ] = await Promise.all([
    getTodos(),
    getUsers(),
  ]);

  dispatch(handleSuccess(todosFromServer.map(todo => (
    {
      ...todo,
      user: usersFromServer.find(person => person.id === todo.userId),
    }))));
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todoList: action.todoList,
        isLoading: true,
      };

    case HANDLE_DELETE:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

const initialState = {
  isLoading: false,
  hasError: false,
  todoList: [],
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
