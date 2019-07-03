import {TODOS_LOAD, USERS_LOAD, TODOS_RECEIVED, USERS_RECEIVED, REMOVE_ITEM} from "./actions";

const initialState = {
  todoLoading: false,
  userLoading: false,

  todoList: null,
  userList: null
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case TODOS_LOAD:
      return {
        ...state,
        todoLoading: true,
        todoList: null,
      };
    case USERS_LOAD:
      return {
        ...state,
        userLoading: true,
        userList: null,
      };
    case TODOS_RECEIVED:
      return {
        ...state,
        todoLoading: false,
        todoList: action.payload
      };
    case USERS_RECEIVED:
      return {
        ...state,
        userLoading: false,
        userList: action.payload
      };
    case REMOVE_ITEM:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
}
