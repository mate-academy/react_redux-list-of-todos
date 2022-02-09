import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const LOAD_TODOS = 'LOAD_TODOS';
const LOAD_USER = 'LOAD_USER';
const SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID';
const SET_SEARCH_TITLE = 'SET_SEARCH_TITLE';
const SET_FILTER_PARAMETER = 'SET_FILTER_PARAMETER';
const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
const SET_USER_ERROR = 'SET_USER_ERROR';

const initialState: RootState = {
  selectedUserId: 0,
  todos: [],
  filterParameter: 'All',
  searchTitle: '',
  userError: '',
  user: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  },
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case SET_SEARCH_TITLE:
      return {
        ...state,
        searchTitle: action.payload,
      };

    case SET_FILTER_PARAMETER:
      return {
        ...state,
        filterParameter: action.payload,
      };

    case TOGGLE_TODO_STATUS:
      return {
        ...state,
        todos: action.payload,
      };

    case SET_USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
