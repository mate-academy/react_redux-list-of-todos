import { createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, ActionsType, Actions } from './types';

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
  user: null,
};

const reducer: Reducer<RootState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case ActionsType.SetUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };
    case ActionsType.AddUser:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const store: Store<RootState, Actions> = createStore(
  reducer,
  composeWithDevTools(),
);

export default store;
