import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import { TodosServiceProvider } from './components/todos-service-context';
import TodosService from './services/todos-service';

import store from './store';

const todosService = new TodosService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TodosServiceProvider value={todosService}>
        <Router>
          <App />
        </Router>
      </TodosServiceProvider>
    </ErrorBoundry>
  </Provider>
  , document.getElementById('root'));
