import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../types';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_SORT_FIELD = 'SET_SORT_FIELD';
const SET_CUSTOM_TODOS = 'SET_CUSTOM_TODOS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_BUTTON_TEXT = 'SET_BUTTON_TEXT';

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
  customTodos: [],
};

export const getSortedTodos = ({ sortField, customTodos }: RootState) => {
  switch (sortField) {
    case 'UserName':
      return [...customTodos].sort((a, b) => a.user.name.localeCompare(b.user.name));
    case 'Title':
      return [...customTodos].sort((a, b) => a.title.localeCompare(b.title));
    case 'Completed':
      return [...customTodos].sort((a, b) => +a.completed - +b.completed);
    default:
      return [...customTodos];
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
    case SET_CUSTOM_TODOS:
      return { ...state, customTodos: action.customTodos };
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
