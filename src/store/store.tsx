import { createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Actions, ActionsType, State } from './types';

const initialState: State = {
  todos: [],
  selectedUserId: 0,
  user: null,
};

const reducer: Reducer<State, Actions> = (
  state = initialState,
  action,
): State => {
  switch (action.type) {
    case ActionsType.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case ActionsType.SetSelectedUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case ActionsType.AddUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionsType.DeleteTodo:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const store: Store<State, Actions> = createStore(
  reducer,
  composeWithDevTools(),
);
