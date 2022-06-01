import { AnyAction, createStore, Reducer } from 'redux';

export enum ActionTypes {
  AddTodos = 'AddTodos',
  SelectUserId = 'SelectUserId',
  CurrentUser = 'CurrentUser',
  DeleteTodos = 'DeleteTodos',
}

export const addTodosAction = (todos: Todo[]) => ({
  type: ActionTypes.AddTodos,
  todos,
});

export const selectUserIdAction = (selectedUserId: number) => ({
  type: ActionTypes.SelectUserId,
  selectedUserId,
});

export const currentUserAction = (currentUser: User) => ({
  type: ActionTypes.CurrentUser,
  currentUser,
});

export const deleteTodosAction = (id: number) => ({
  type: ActionTypes.DeleteTodos,
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
    case ActionTypes.AddTodos:
      return {
        ...state,
        todos: [...action.todos],
      };

    case ActionTypes.SelectUserId:
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };

    case ActionTypes.CurrentUser:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case ActionTypes.DeleteTodos:
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
