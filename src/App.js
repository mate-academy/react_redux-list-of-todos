import React from 'react';
import './App.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk"
import { todoApp } from './redux/reducer';
import TodoListHandler from './components/TodoListHandler';

let store = createStore(todoApp, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler/>
    </Provider>
  );
}

export default App;
