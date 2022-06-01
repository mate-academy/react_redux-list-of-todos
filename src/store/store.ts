import { createStore, Reducer, Store } from 'redux';
import { State, Actions, ActionsTypes } from '../types';

const initialState: State = {
  todos: [],
  selectedUserId: 0,
};

const reducer: Reducer<State, Actions>
= (state = initialState, action): State => {
  switch (action.type) {
    case ActionsTypes.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case ActionsTypes.SetSelectedUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    default:
      return state;
  }
};

export const store: Store<State, Actions>
  = createStore(reducer);
