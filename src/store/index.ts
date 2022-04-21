import {
  createStore, Reducer, applyMiddleware, Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Actions, ActionsType, State } from './types';

const initialState = {
  todos: [],
  user: null,
};

const rootReducer: Reducer<State, Actions> = (
  state = initialState,
  action,
): State => {
  switch (action.type) {
    case ActionsType.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case ActionsType.HandleCheck:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };

    case ActionsType.AddUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionsType.ClearUser:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const store: Store<State, Actions> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
