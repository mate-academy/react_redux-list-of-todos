export interface StateTodo {
  todos: Todo[],
  loading: boolean,
  error:null | string,
  query: string,
  sortedTodos: Todo[],
  completeStatus: string,
  userId: number,
  user: User | null,
  isLoadingError: boolean,
}

interface SuccesAddTodoFromServer {
  type: Action.SUCCES_ADD_TODO;
  payload: Todo[]
}

interface AddTodosFromServer {
  type: Action.ADD_TODOS_FROM_SERVER;
}

interface ErrorAddTodoFromServer {
  type: Action.ERROR_ADD_TODO;
  payload: string;
}

interface FilterByName {
  type: Action.FILTER_BY_NAME;
  payload: string;
}

interface SortTodo {
  type: Action.SORT_TODO;
  payload: Todo[]
}

interface CompleteStatus {
  type: Action.SET_COMPLETE_STATUS,
  payload: string,
}

interface SetRandom {
  type: Action.SET_RANDOM,
  payload: Todo[],
}

interface DeleteTodo {
  type: Action.DELETE_TODO,
  payload: number,
}

interface SetUserId {
  type: Action.SET_USER_ID,
  payload: number,
}

interface AddUser {
  type: Action.ADD_USER,
  payload: User,
}

interface IsLoadingError {
  type: Action.IS_LOADING_ERROR,
  payload: boolean,
}

export type TodoAction = AddTodosFromServer
| SuccesAddTodoFromServer
| ErrorAddTodoFromServer
| FilterByName
| SortTodo
| CompleteStatus
| SetRandom
| DeleteTodo
| SetUserId
| AddUser
| IsLoadingError;

export enum Action {
  ADD_TODOS_FROM_SERVER = 'ADD_TODOS_FROM_SERVER',
  SUCCES_ADD_TODO = 'SUCCES_ADD_TODO',
  ERROR_ADD_TODO = 'ERROR_ADD_TODO',
  FILTER_BY_NAME = 'FILTER_BY_NAME',
  SORT_TODO = 'SORT_TODO',
  SET_COMPLETE_STATUS = 'SET_COMPLETE_STATUS',
  SET_RANDOM = 'SET_RANDOM',
  DELETE_TODO = 'DELETE_TODO',
  SET_USER_ID = 'SET_USER_ID',
  ADD_USER = 'ADD_USER',
  IS_LOADING_ERROR = 'IS_LOADING_ERROR',
}
