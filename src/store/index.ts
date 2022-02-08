import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Action = {
  type: string,
  value: any,
};

export type State = {
  selectedUserId: 0,
  todos: Todo[],
  selectedUser: User,
  isUserValid: boolean,
  filterByTitle: string,
  filterByStatus: string,
};

const LOAD_TODOS = 'LOAD_TODOS';
const SET_USER_ID = 'SET_USER_ID';
const LOAD_SELECTED_USER = 'LOAD_SELECTED_USER';
const SET_IS_USER_VALID = 'SET_IS_USER_VALID';
const SET_FILTER_TITLE = 'SET_FILTER_TITLE';
const SET_FILTER_STATUS = 'SET_FILTER_STATUS';

const defaultState: State = {
  todos: [],
  selectedUserId: 0,
  selectedUser: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  isUserValid: true,
  filterByTitle: '',
  filterByStatus: '',
};

const reducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.value],
      };

    case SET_USER_ID:
      return { ...state, selectedUserId: action.value };

    case LOAD_SELECTED_USER:
      return { ...state, selectedUser: { ...action.value } };

    case SET_IS_USER_VALID:
      return { ...state, isUserValid: action.value };

    case SET_FILTER_TITLE:
      return { ...state, filterByTitle: action.value };

    case SET_FILTER_STATUS:
      return { ...state, filterByStatus: action.value };

    default:
      return { ...state };
  }
};

export const loadSelectedUserAction = (value: User) => ({ type: LOAD_SELECTED_USER, value });
export const selectUserIdAction = (value: number) => ({ type: SET_USER_ID, value });
export const loadTodosAction = (value: Todo[]) => ({ type: LOAD_TODOS, value });
export const isUserValidAction = (value: boolean) => ({ type: SET_IS_USER_VALID, value });
export const filterByStatusAction = (value: string) => ({ type: SET_FILTER_STATUS, value });
export const filterByTitleAction = (value: string) => ({ type: SET_FILTER_TITLE, value });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
