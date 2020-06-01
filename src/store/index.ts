import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../types';

// Action types - is just a constant. MUST have a unique value.
export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_WITH_USER_TODOS = 'SET_WITH_USER_TODOS';
export const SET_IS_LOADED = 'SET_IS_LOADED';
export const SET_BUTTON_TEXT = 'SET_BUTTON_TEXT';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getIsLoaded = (state: RootState) => state.isLoaded;
export const getButtonText = (state: RootState) => state.buttonText;
export const getSortField = (state: RootState) => state.sortField;

const initialState: RootState = {
  loading: false,
  isLoaded: false,
  buttonText: 'Click to load',
  users: [],
  todos: [],
  sortField: 'title',
  withUserTodos: [],
};

export const getSortedTodos = ({ sortField, withUserTodos }: RootState) => {
  switch (sortField) {
    case 'UserName':
      return [...withUserTodos].sort((a, b) => a.user.name.localeCompare(b.user.name));
    case 'Title':
      return [...withUserTodos].sort((a, b) => a.title.localeCompare(b.title));
    case 'Completed':
      return [...withUserTodos].sort((a, b) => +a.completed - +b.completed);
    default:
      return [...withUserTodos];
  }
}

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case SET_SORT_FIELD:
      return { ...state, sortField: action.sortField };
    case SET_BUTTON_TEXT:
      return { ...state, buttonText: action.buttonText };
    case SET_WITH_USER_TODOS:
      return { ...state, withUserTodos: action.withUserTodos };
    case SET_IS_LOADED:
      return { ...state, isLoaded: action.isLoaded };
    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        buttonText: action.buttonText,
      };
    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
