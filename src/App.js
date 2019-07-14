import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getNextState from './redux/redusers';
import TodoListHandler from './components/TodoListHandler';

const store = createStore(getNextState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler />
    </Provider>
  );
}

export default App;
