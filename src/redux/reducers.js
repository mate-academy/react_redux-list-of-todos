import {DISPLAY, LOAD, CHECK_DATA, TODOS_RECEIVED, USERS_RECEIVED, mapData, REMOVE_ITEM} from "./actions";

const initialState = {
  requested: false,
  todoList: null,
  selectedIndex: -1,
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
        return {
            ...state,
            requested: true
        };
    case TODOS_RECEIVED:
        return {
            ...state,
            todos: action.todos
        };
    case USERS_RECEIVED:
        return {
            ...state,
            users: action.users
        };
    case CHECK_DATA:
        const todoList = mapData(state);
        if (todoList) {
          return {
            ...state,
            todoList,
            requested: false
          }
        }
        return state;
    case DISPLAY:
        return {
          ...state,
          todoList: action.todoList,
          requested: false
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
