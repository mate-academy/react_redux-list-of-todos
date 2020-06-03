import { createStore, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SET_LOADING = 'SET_IS_LOADING';
const SET_STATE = 'SET_STATE';
const CHANGE_ALPHABETICALLY_NAME = 'SET_IS_ALPHABETICALLY_NAME';
const CHANGE_ALPHABETICALLY_TITLE = 'SET_IS_ALPHABETICALLY_TITLE';
const CHANGE_COMPLETED = 'SET_IS_COMPLETED';
const DELETE = 'DELETE';

type LoadingAction = Action<typeof SET_LOADING> & {
  loadingStatus: boolean;
};
type SetStateAction = Action<typeof SET_STATE> & {
  todosList: TodoWithUser[];
  loadingStatus: boolean;
};
type AlphabeticallyNameAction = Action<typeof CHANGE_ALPHABETICALLY_NAME> & {
  alphabeticallyNameStatus: boolean;
};
type AlphabeticallyTitleAction = Action<typeof CHANGE_ALPHABETICALLY_TITLE> & {
  alphabeticallyTitleStatus: boolean;
};
type CompletedTodoAction = Action<typeof CHANGE_COMPLETED> & {
  completedTodoStatus: boolean;
};
export type DeleteTodo = Action<typeof DELETE> & {
  idTodo: number;
};

export type InitialState = {
  todosList: TodoWithUser[];
  isLoading: boolean;
  isAlphabeticallyName: boolean;
  isAlphabeticallyTitle: boolean;
  isCompletedTodo: boolean;
};


const initialState: InitialState = {
  todosList: [],
  isLoading: false,
  isAlphabeticallyName: false,
  isAlphabeticallyTitle: false,
  isCompletedTodo: false,
};

export const loading = (loadingStatus: boolean): LoadingAction => (
  {
    type: SET_LOADING,
    loadingStatus,
  }
);

export const setState = (todosList: TodoWithUser[], loadingStatus: boolean): SetStateAction => (
  {
    type: SET_STATE,
    todosList,
    loadingStatus,
  }
);

export const alphabeticallyName = (alphabeticallyNameStatus: boolean): AlphabeticallyNameAction => (
  {
    type: CHANGE_ALPHABETICALLY_NAME,
    alphabeticallyNameStatus,
  }
);

export const alphabeticallyTitle = (alphabeticallyTitleStatus: boolean): AlphabeticallyTitleAction => (
  {
    type: CHANGE_ALPHABETICALLY_TITLE,
    alphabeticallyTitleStatus,
  }
);

export const completedTodo = (completedTodoStatus: boolean): CompletedTodoAction => (
  {
    type: CHANGE_COMPLETED,
    completedTodoStatus,
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
| AlphabeticallyNameAction
| AlphabeticallyTitleAction
| CompletedTodoAction
| DeleteTodo;

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
    };
    case CHANGE_ALPHABETICALLY_NAME: return {
      ...state,
      isAlphabeticallyName: action.alphabeticallyNameStatus,
      isAlphabeticallyTitle: false,
      isCompletedTodo: false,
    };
    case CHANGE_ALPHABETICALLY_TITLE: return {
      ...state,
      isAlphabeticallyTitle: action.alphabeticallyTitleStatus,
      isAlphabeticallyName: false,
      isCompletedTodo: false,
    };
    case CHANGE_COMPLETED: return {
      ...state,
      isCompletedTodo: action.completedTodoStatus,
      isAlphabeticallyTitle: false,
      isAlphabeticallyName: false,
    };
    case DELETE: return {
      ...state,
      todosList: state.todosList.filter(todo => todo.id !== action.idTodo),
    };
    default: return state;
  }
};

const store = createStore(todoListReducer, composeWithDevTools());

export default store;
