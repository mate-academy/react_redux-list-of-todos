import { AnyAction, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { User } from '../types/UserType';

const GET_USERS = 'GET_USERS';
const UPDATE_USERS = 'UPDATE_USERS';
const GET_USER = 'GET_USER';
const CORRECT_USER = 'CORRECT_USER';
const DELETE_USER = 'DELETE_USER';
const GET_ERROR = 'GET_ERROR';
const OPEN_FORM = 'OPEN_FORM';
const CORRECT_FORM = 'CORRECT_FORM';
const GET_START = 'GET_START';

export const actions = {
  getUsers: (users: User[]) => ({
    type: GET_USERS,
    users,
  }),
  updateLocalUsers: (user: User) => ({
    type: UPDATE_USERS,
    user,
  }),
  getUser: (user: User) => ({
    type: GET_USER,
    user,
  }),
  correctUser: (userId: number) => ({
    type: CORRECT_USER,
    userId,
  }),
  deleteUser: (id: number) => ({
    type: DELETE_USER,
    id,
  }),
  getError: (messageError: string) => ({
    type: GET_ERROR,
    messageError,
  }),
  getIsOpenForm: (isOpenForm: boolean) => ({
    type: OPEN_FORM,
    isOpenForm,
  }),
  getIsCorrectForm: (isCorrectForm: boolean) => ({
    type: CORRECT_FORM,
    isCorrectForm,
  }),
  getStartIndex: (start: number) => ({
    type: GET_START,
    start,
  }),
};

export const selectors = {
  loadUsers: (state: RootState) => state.users,
  getUser: (state: RootState) => state.user,
  getUserId: (state: RootState) => state.userId,
  getMessageError: (state: RootState) => state.messageError,
  getIsOpenForm: (state: RootState) => state.isOpenForm,
  getIsCorrectForm: (state: RootState) => state.isCorrectForm,
  getStartIndex: (state: RootState) => state.start,
};

export type RootState = {
  users: User[],
  user: User,
  userId: number,
  messageError: string,
  isOpenForm: boolean,
  isCorrectForm: boolean,
  start: number,
};

const initialState: RootState = {
  users: [],
  user: {
    _id: '',
    name: '',
    surname: '',
    desc: '',
    user_id: 0,
    __v: 0,
  },
  userId: 0,
  messageError: '',
  isOpenForm: false,
  isCorrectForm: false,
  start: 0,
};

const rootReducer = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };

    case UPDATE_USERS:
      return {
        ...state,
        users: [
          ...state.users,
          action.user,
        ],
      };

    case GET_USER:
      return { ...state, user: action.user };

    case CORRECT_USER:
      return { ...state, userId: action.userId };

    case DELETE_USER:
      return {
        ...state,
        // eslint-disable-next-line
        users: [...state.users].filter((person) => person.user_id !== action.id),
      };

    case GET_ERROR:
      return { ...state, messageError: action.messageError };

    case OPEN_FORM:
      return { ...state, isOpenForm: action.isOpenForm };

    case CORRECT_FORM:
      return { ...state, isCorrectForm: action.isCorrectForm };

    case GET_START:
      return { ...state, start: action.start };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
