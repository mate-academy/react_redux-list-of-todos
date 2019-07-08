import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { getNextState } from './redux/reducers';
import TodoListHandler from './components/TodoListHandler';
import thunk from 'redux-thunk';
import './App.css';

const store = createStore(getNextState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler />
    </Provider>
  );
}

export default App;
