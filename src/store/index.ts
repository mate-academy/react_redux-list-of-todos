import { legacy_createStore as createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState: RootState = {
  selectedUserId: 0,
  todos: [],
};

const GET_TODOS = 'GET_TODOS';
const SET_SELECTED_USERID = 'SET_SELECTED_USERID';

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload };

    case SET_SELECTED_USERID:
      return { ...state, selectedUserId: action.payload };

    default: return state;
  }
};

// Selectors
export const getTodosSelector = (state: RootState) => state.todos;
// eslint-disable-next-line max-len
export const getSelectUserIdSelector = (state: RootState) => state.selectedUserId;

// Creators
export const getTodos = (payload: Todo[]) => ({ type: GET_TODOS, payload });
// eslint-disable-next-line max-len
export const setSelectUserId = (id: number) => ({ type: SET_SELECTED_USERID, payload: id });

export const store = createStore(reducer, composeWithDevTools());
