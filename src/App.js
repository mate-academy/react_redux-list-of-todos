import React from 'react';
import './App.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './redux/reducer';
import { TodoListHandler } from './components/TodoListHandler';

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler />
    </Provider>
  );
}

export default App;
