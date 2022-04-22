import { Reducer } from 'redux';
import {
  Actions,
  ActionTypes,
  RootState,
} from './types';

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
  user: null,
};

export const rootReducer: Reducer<RootState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case ActionTypes.SelectedUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case ActionTypes.AddUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.RemoveTodo:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};
