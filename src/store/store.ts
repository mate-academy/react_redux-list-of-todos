import { createStore, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SET_LOADING = 'SET_IS_LOADING';
const SET_STATE = 'SET_STATE';
const DELETE = 'DELETE';
const SORTED_TITLE = 'SORTED_TITLE';
const SORTED_NAME = 'SORTED_NAME';
const SORTED_COMPLETED = 'SORTED_COMPLETED';

type LoadingAction = Action<typeof SET_LOADING> & {
  loadingStatus: boolean;
};
type SetStateAction = Action<typeof SET_STATE> & {
  todosList: TodoWithUser[];
  loadingStatus: boolean;
};
export type DeleteTodo = Action<typeof DELETE> & {
  idTodo: number;
};
type SortedName = Action<typeof SORTED_NAME> & {
  sortValue: string;
  isAlphabeticallyName: boolean;
};
type SortedTitle = Action<typeof SORTED_TITLE> & {
  sortValue: string;
  isAlphabeticallyTitle: boolean;
};
type SortedCompleted = Action<typeof SORTED_COMPLETED> & {
  sortValue: string;
  isCompleted: boolean;
};

export type InitialState = {
  todosList: TodoWithUser[];
  isLoading: boolean;
  isAlphabeticallyName: boolean;
  isAlphabeticallyTitle: boolean;
  isCompletedTodo: boolean;
  sortValue: string | null;
};


const initialState: InitialState = {
  todosList: [],
  isLoading: false,
  isAlphabeticallyName: false,
  isAlphabeticallyTitle: false,
  isCompletedTodo: false,
  sortValue: null,
};

export const loading = (loadingStatus: boolean): LoadingAction => (
  {
    type: SET_LOADING,
    loadingStatus,
  }
);

export const setState
  = (todosList: TodoWithUser[], loadingStatus: boolean): SetStateAction => (
    {
      type: SET_STATE,
      todosList,
      loadingStatus,
    }
  );

export const sortedName
  = (sortValue: string, isAlphabeticallyName: boolean): SortedName => (
    {
      type: SORTED_NAME,
      sortValue,
      isAlphabeticallyName,
    }
  );
export const sortedTitle
  = (sortValue: string, isAlphabeticallyTitle: boolean): SortedTitle => (
    {
      type: SORTED_TITLE,
      sortValue,
      isAlphabeticallyTitle,
    }
  );
export const sortedCompleted
  = (sortValue: string, isCompleted: boolean): SortedCompleted => (
    {
      type: SORTED_COMPLETED,
      sortValue,
      isCompleted,
    }
  );

export const deleteTodo = (idTodo: number): DeleteTodo => (
  {
    type: DELETE,
    idTodo,
  }
);

export type AllActions = LoadingAction
| SetStateAction
| DeleteTodo
| SortedName
| SortedTitle
| SortedCompleted;

const todoListReducer = (state = initialState, action: AllActions) => {
  switch (action.type) {
    case SET_LOADING: return {
      ...state,
      isLoading: action.loadingStatus,
    };
    case SET_STATE: return {
      ...state,
      todosList: action.todosList,
      isLoading: action.loadingStatus,
      sortedTodos: action.todosList,
    };
    case DELETE: return {
      ...state,
      todosList: state.todosList.filter(todo => todo.id !== action.idTodo),
    };
    case SORTED_NAME: return {
      ...state,
      sortValue: action.sortValue,
      isAlphabeticallyName: !action.isAlphabeticallyName,
      isAlphabeticallyTitle: false,
      isCompletedTodo: false,
    };
    case SORTED_TITLE: return {
      ...state,
      sortValue: action.sortValue,
      isAlphabeticallyTitle: !action.isAlphabeticallyTitle,
      isAlphabeticallyName: false,
      isCompletedTodo: false,
    };
    case SORTED_COMPLETED: return {
      ...state,
      sortValue: action.sortValue,
      isCompletedTodo: !action.isCompleted,
      isAlphabeticallyTitle: false,
      isAlphabeticallyName: false,
    };
    default: return state;
  }
};

export const prepareTodos = (state: InitialState) => {
  switch (state.sortValue) {
    case SORTED_NAME:
      if (!state.isAlphabeticallyName) {
        return [...state.todosList].sort((a, b) => a.user.name.localeCompare(b.user.name));
      }

      return [...state.todosList].sort((a, b) => b.user.name.localeCompare(a.user.name));
    case SORTED_TITLE:
      if (!state.isAlphabeticallyTitle) {
        return [...state.todosList].sort((a, b) => a.title.localeCompare(b.title));
      }

      return [...state.todosList].sort((a, b) => b.title.localeCompare(a.title));
    case SORTED_COMPLETED:
      if (!state.isCompletedTodo) {
        return [...state.todosList].sort((a, b) => Number(a.completed) - Number(b.completed));
      }

      return [...state.todosList].sort((a, b) => Number(b.completed) - Number(a.completed));
    default: return state.todosList;
  }
};

const store = createStore(todoListReducer, composeWithDevTools());

export default store;
