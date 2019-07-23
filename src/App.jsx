import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import getNextState from './redux/reducers';
import TodoListHandler from './components/TodoListHandler';

const store = createStore(getNextState, applyMiddleware(thunk));
export default function App() {
  return (
    <Provider store={store}>
      <TodoListHandler />
    </Provider>
  );
}
