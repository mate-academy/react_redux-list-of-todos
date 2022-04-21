import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  Actions, ActionsType, RootState,
} from './types';

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
  user: null,
};

const rootReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionsType.LoadTodos:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ActionsType.DeleteTodo:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case ActionsType.SelectUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case ActionsType.LoadUser:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
