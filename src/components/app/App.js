import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoHeader from '../todo-header';
import { TodoListPage, UserInfoPage } from '../pages';

class App extends Component {
  render() {
    return (
      <main role="main" className="container">
        <TodoHeader />
        <Switch>
          <Route
            path="/"
            component={TodoListPage}
            exact />
          <Route
            path="/user/:id"
            component={UserInfoPage}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
