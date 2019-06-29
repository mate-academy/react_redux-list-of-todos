import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getNextState } from './redux/reducers';
import TodoListHandler from './Components/TodoListHandler';

const store = createStore(getNextState, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <TodoListHandler />
    </Provider>
  );
}

export default App;
