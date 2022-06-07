import { createStore, AnyAction, Reducer } from 'redux';
import { Todo, User } from '../react-app-env.d';

export enum ActionTypes {
  ADD_TODOS = 'ADD_TODOS',
  SELECTED_USER = 'SELECTED_USER',
  CURRENT_USER = 'CURRENT_USER',
  DELETE_TODOS = 'DELETE_TODOS',
}

export const addTodosAction = (todos: Todo[]) => ({
  type: ActionTypes.ADD_TODOS,
  todos,
});

export const selectUser = (selectedUserId: number) => ({
  type: ActionTypes.SELECTED_USER,
  selectedUserId,
});

export const curentUserAction = (currentUser: User) => ({
  type: ActionTypes.CURRENT_USER,
  currentUser,
});

export const deleteTodosAction = (id: number) => ({
  type: ActionTypes.DELETE_TODOS,
  id,
});

export const getTodosSelector = (state: State) => state.todos;

export const getSelectedUserIdSelector = (state: State) => state.selectedUserId;

export const getCurrentUserSelector = (state: State) => state.currentUser;

interface State {
  todos: Todo[];
  selectedUserId: number;
  currentUser: User | null;
}

const initialState: State = {
  todos: [],
  selectedUserId: 0,
  currentUser: null,
};

const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case ActionTypes.SELECTED_USER:
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };

    case ActionTypes.CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case ActionTypes.DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
