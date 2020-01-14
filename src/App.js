import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers/reducer';
import TodoList from './components/TodoList';

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
