import { createStore, Reducer, Store } from 'redux';
import { Actions, ActionType, State } from './types';

const initialState: State = {
  todos: [],
  selectUserById: 0,
  user: null,
  removeTodoById: 0,
};

const reducer: Reducer<State, Actions> = (
  state: State = initialState, action,
): State => {
  switch (action.type) {
    case ActionType.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case ActionType.SelectUserById:
      return {
        ...state,
        selectUserById: action.payload,
      };
    case ActionType.LoadUserById:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.RemoveTodoById:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const store: Store<State, Actions> = createStore(reducer);
