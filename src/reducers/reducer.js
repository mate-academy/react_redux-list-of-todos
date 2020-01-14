import { TODO_ACTIONS } from '../actions/actions';

const initialState = {
  todoList: null,
  userList: null,
  loadingError: null,
  editItem: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TODO_ACTIONS.GET_TODOS:
      return {
        ...state,
        todoList: action.payload,
      };
    case TODO_ACTIONS.GET_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    case TODO_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload,
      };
    case TODO_ACTIONS.CLOSE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload),
        editItem: null,
      };
    default:
      return state;
  }
}
