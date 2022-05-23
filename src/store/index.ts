import { createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodosState, Actions, ActionsType } from './types';

const initialState: TodosState = {
  todos: [],
  selectedId: 0,
  selectedUser: null,
};

export const todosReducer: Reducer<TodosState, Actions> = (
  state = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionsType.LoadTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case ActionsType.SelectId:
      return {
        ...state,
        selectedId: action.payload,
      };
    case ActionsType.CurrentUser:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(todosReducer, composeWithDevTools());

export default store;
