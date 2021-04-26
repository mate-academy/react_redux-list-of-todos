import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const SELECT_USER_ID = 'SELECT_USER_ID';
const SET_QUERY = 'SET_QUERY';
const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

// Action creators - a function returning an action object
export const setUserId = (userId = 0) => ({ type: SELECT_USER_ID, userId });
export const setQuery = (query: string) => ({ type: SET_QUERY, query });
export const setFilterType = (filterType: string) => ({ type: SET_FILTER_TYPE, filterType });

// Selectors - a function receiving Redux state and returning some data from it
export const getUserId = (state: RootState) => state.userId;
export const getQuery = (state: RootState) => state.query;
export const getFilterType = (state: RootState) => state.filterType;

// Initial state
export type RootState = {
  userId: number;
  query: string;
  filterType: string;
};

const initialState: RootState = {
  userId: 0,
  query: '',
  filterType: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SELECT_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };

    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.filterType,
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
