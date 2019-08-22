import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PostsList from './PostsList';

const initialState = {
  posts: [],
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        posts: action.value,
      };

    case 'SET_COMMENT':
      return {
        ...state,
        comments: [
          ...state.comments,
          action.value,
        ],
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.commentId !== action.value),
      };

    default:
      return state;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serialaizedState = JSON.stringify(state);

    localStorage.setItem('state', serialaizedState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serialaizedState = localStorage.getItem('state');

    if (serialaizedState === null) { return undefined; }

    return JSON.parse(serialaizedState);
  } catch (e) {
    console.log(e);

    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = createStore(
  reducer,
  persistedState,
);

store.subscribe(() => saveToLocalStorage(store.getState()));

const App = () => (
  <Provider store={store}>
    <PostsList />
  </Provider>
);

export default App;
