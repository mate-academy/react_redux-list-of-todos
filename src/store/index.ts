import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import selectedUser, { InitialSelectedUser } from './selectedUser';
import todos, { InitStateTodo } from './todos';

export type RootReducer = {
  todos: InitStateTodo,
  selectedUser: InitialSelectedUser
};

// Action types - is just a constant. MUST have a unique value.
// Action creators - a function returning an action object
// Selectors - a function receiving Redux state and returning some data from it

// rootReducer - this function is called after dispatching an action
const rootReducer = combineReducers({
  todos,
  selectedUser,
});

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(), // allows you to use http://extension.remotedev.io/
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
