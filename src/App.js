import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {reducer} from './redux/reducers';
import {Provider} from 'react-redux';
import TodoListHandler from './components/TodoListHandler';
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler/>
    </Provider>
  );
}

export default App;
