import { createStore, AnyAction, Dispatch, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getTodos, getUser, updateTodo } from '../api';
import { Todo, RootState, User } from '../types';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const GET_TODOS = 'GET_TODOS';
const SET_USERID = 'SET_USERID';
const SET_USER = 'SET_USER';
const SET_USER_ERROR = 'SET_USER_ERROR';
const SET_USER_SELECTED = 'SET_USER_SELECTED';
const SET_SEARCH_QUERY = 'SET_INPUT_QUERY';
const SET_FILTER_STATUS = 'SET_FILTER_STATUS';
const SET_TODOS_CHANGED_STATUS = 'SET_TODOS_CHANGED_STATUS';
const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';

// Action creators - a function returning an action object
export const startLoading = (loading: boolean) => ({ type: START_LOADING, value: loading });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });
export const setTodos = (todos: Todo[]) => ({ type: GET_TODOS, value: todos });
export const setTodosChangedStatus = (status: boolean) => ({ type: SET_TODOS_CHANGED_STATUS, value: status });
export const updateTodoStatus = (id: number) => ({ type: UPDATE_TODO_ITEM, value: id });
export const setUserId = (id: number) => ({ type: SET_USERID, value: id });
export const setUser = (user: User) => ({ type: SET_USER, value: user });
export const setUserError = (isUserError: boolean) => ({ type: SET_USER_ERROR, value: isUserError });
export const setUserSelected = (userSelected: boolean) => ({ type: SET_USER_SELECTED, value: userSelected });
export const setSearchQuery = (searchQuery: string) => ({ type: SET_SEARCH_QUERY, value: searchQuery });
export const setFilterStatus = (filterStatus: string) => ({ type: SET_FILTER_STATUS, value: filterStatus });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const isUserError = (state: RootState) => state.isUserError;
export const isUserSelected = (state: RootState) => state.isUserSelected;
export const getListOfTodos = (state: RootState) => state.todos;
export const getTodoStatus = (state: RootState) => state.todos;
export const getUserId = (state: RootState) => state.userId;
export const getUserInfo = (state: RootState) => state.user;
export const getSearchQuery = (state: RootState) => state.searchQuery;
export const getFilterStatus = (state: RootState) => state.filterStatus;

export const getTodosFromServer = () => {
  return (dispatch: Dispatch) => {
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos.data));
        dispatch(startLoading(false));
      })
      .catch(result => {
        console.warn(result.message);
      });
  };
};

export const getUserFromServer = (id: number) => {
  return (dispatch: Dispatch) => {
    getUser(id)
      .then(user => {
        dispatch(setUser(user.data));
      })
      .catch(result => {
        console.warn('Failed loading user data.', result.message);
        dispatch(setUserError(true));
      });
  };
};

// Not used method
export const updateTodoOnServer = (todo: Todo, id: string) => {
  return () => {
    updateTodo(todo, id)
      .then(response => {
        console.info('%cUpdated todo with ID ' + id, 'color: #159a32');
        console.table(response);
      })
      .catch(result => {
        console.error(result.message);
      });
  };
}

// NOTE: Suggestion from
// https://redux.js.org/usage/structuring-reducers
// ->/immutable-update-patterns#updating-an-item-in-an-array
const updateTodoItem = (todos: Todo[], id: number) => {
  return todos.map(todo => {
    if (todo.id !== id) {
      return todo;
    }

    return {
      ...todo,
      completed: !todo.completed,
    }
  })
}

// Initial state
const initialState: RootState = {
  todos: [],
  user: {},
  userId: 0,
  isUserSelected: false,
  isUserError: false,
  searchQuery: '',
  filterStatus: '',

  loading: false
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: [...action.value],
      };
      
    case SET_TODOS_CHANGED_STATUS:
      return {
        ...state,
        todosStatusChanged: action.value,
      };

    case UPDATE_TODO_ITEM:
      return {
        ...state,
        todos: updateTodoItem(state.todos, action.value),
      };

    case START_LOADING:
      return {
        ...state,
        loading: action.value
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    
    case SET_USERID:
      return {
        ...state,
        userId: action.value,
      };

    case SET_USER:
      return {
        ...state,
        user: action.value,
      };
    
    case SET_USER_SELECTED:
      return {
        ...state,
        isUserSelected: action.value,
      };

    case SET_USER_ERROR:
      return {
        ...state,
        isUserError: action.value,
      };
    
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.value,
      };

    case SET_FILTER_STATUS:
      return {
        ...state,
        filterStatus: action.value,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
