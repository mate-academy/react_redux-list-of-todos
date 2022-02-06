import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

const LOAD_TODOS = 'LOAD_TODOS';
const SET_USER_ID = 'SET_USER_ID';
const LOAD_SELECTED_USER = 'LOAD_SELECTED_USER';
const SET_IS_USER_VALID = 'SET_IS_USER_VALID';
const SET_FILTER_TITLE = 'SET_FILTER_TITLE';
const SET_FILTER_STATUS = 'SET_FILTER_STATUS';

export type State = {
  selectedUserId: 0,
  todos: Todo[],
  selectedUser: User,
  isUserValid: boolean,
  filterByTitle: string,
  filterByStatus: string,
};

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

const reducer = (state = defaultState, action: any): State => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payLoad],
      };

    case SET_USER_ID:
      return { ...state, selectedUserId: action.payLoad };

    case LOAD_SELECTED_USER:
      return { ...state, selectedUser: { ...action.payLoad } };

    case SET_IS_USER_VALID:
      return { ...state, isUserValid: action.payLoad };

    case SET_FILTER_TITLE:
      return { ...state, filterByTitle: action.payLoad };

    case SET_FILTER_STATUS:
      return { ...state, filterByStatus: action.payLoad };

    default:
      return { ...state };
  }
};

export const loadSelectedUserAction = (payLoad: User) => ({ type: LOAD_SELECTED_USER, payLoad });
export const selectUserIdAction = (payLoad: number) => ({ type: SET_USER_ID, payLoad });
export const loadTodosAction = (payLoad: Todo[]) => ({ type: LOAD_TODOS, payLoad });
export const isUserValidAction = (payLoad: boolean) => ({ type: SET_IS_USER_VALID, payLoad });
export const filterByStatusAction = (payLoad: string) => ({ type: SET_FILTER_STATUS, payLoad });
export const filterByTitleAction = (payLoad: string) => ({ type: SET_FILTER_TITLE, payLoad });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
