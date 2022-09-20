import { randomize } from './utils';

type GetTodos = {
  type: 'GET_TODOS',
  payload: Todo[],
};

type SetTodoStatus = {
  type: 'SET_TODO_STATUS',
  payload: boolean | null,
};

type SelectUser = {
  type: 'SELECT_USER',
  payload: number | null,
};

type GetUserInfo = {
  type: 'GET_USER_INFO',
  payload: User
};

type Randomize = {
  type: 'RANDOMIZE',
};

type Action = (
  | GetTodos
  | SetTodoStatus
  | SelectUser
  | GetUserInfo
  | Randomize
);

type State = {
  todos: Todo[];
  todoStatus: boolean | null,
  selectedUser: number | null,
  userInfo: User | null,
};

const initialState: State = {
  todos: [],
  todoStatus: null,
  selectedUser: null,
  userInfo: null,
};

export const currentTodoReducer
= (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'SET_TODO_STATUS':
      return {
        ...state,
        todoStatus: action.payload,
      };

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'GET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };

    case 'RANDOMIZE':
      return {
        ...state,
        todos: randomize(state.todos),
      };

    default:
      return state;
  }
};

export const actions = {
  getTodos: (todos: Todo[]): GetTodos => ({
    type: 'GET_TODOS',
    payload: todos,
  }),

  setTodoStatus: (filterByStatus: boolean | null): SetTodoStatus => ({
    type: 'SET_TODO_STATUS',
    payload: filterByStatus,
  }),

  selectUser: (selectedUser: number | null): SelectUser => ({
    type: 'SELECT_USER',
    payload: selectedUser,
  }),

  getUserInfo: (userInfo: User): GetUserInfo => ({
    type: 'GET_USER_INFO',
    payload: userInfo,
  }),

  randomize: (): Randomize => ({
    type: 'RANDOMIZE',
  }),
};
