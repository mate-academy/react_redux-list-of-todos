import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SET_USER, SET_TODOS } from './actions';

// Action types - is just a constant. MUST have a unique value.
// Action creators - a function returning an action object
// Selectors - a function receiving Redux state and returning some data from it
// Initial state
const initialState: State = {
  todos: [],
  userId: 0,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userId: action.payload };

    case SET_TODOS:
      return { ...state, todos: action.payload };

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
