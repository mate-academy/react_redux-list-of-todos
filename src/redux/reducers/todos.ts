import { Todo } from '../../types/Todo';
import {
  ActionDeleteTodo,
  ActionSetCurrentUser,
  ActionSetTodos,
} from '../actions/todos';
import { ActionTypes } from '../../types/actionTypes';

const initialState = {
  selectedUser: null,
  todos: [],
};

const todosList = (
  state = initialState,
  action: ActionSetTodos | ActionSetCurrentUser | ActionDeleteTodo,
) => {
  switch (action.type) {
    case ActionTypes.SET_TODOS: {
      return {
        ...state,
        todos: action.payload.todos,
      };
    }

    case ActionTypes.SELECT_USER: {
      return {
        ...state,
        selectedUser: action.payload.userId,
      };
    }

    case ActionTypes.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((item: Todo) => (
          item.id !== action.payload.todoId
        )),
      };
    }

    default:
      return state;
  }
};

export default todosList;
