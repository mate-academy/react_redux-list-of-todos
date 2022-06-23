import { Todo } from '../../../types/Todo';
import { ActionTypes, AuthAction } from './types';

const initialState = {
  selectedUser: null,
  todos: [],
};

const todosList = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.SET_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case ActionTypes.SELECT_USER: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }

    case ActionTypes.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((item: Todo) => (
          item.id !== action.payload
        )),
      };
    }

    default:
      return state;
  }
};

export default todosList;
