import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import {
  store, getTodosWithUsers, loading, loaded,
} from './store';
import { getData } from './api/data';

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends React.Component {
  state = {
    todos: store.getState().todos,
  };

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({
      todos: store.getState().todos,
    }));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = () => {
    store.dispatch(loading());
    Promise.all([getData(TODOS_API_URL), getData(USERS_API_URL)]).then(
      ([todos, users]) => {
        store.dispatch(loading());
        store.dispatch(getTodosWithUsers(todos, users));
        store.dispatch(loaded());
      }
    );
  };

  render() {
    const { todos, isLoading, isLoaded } = store.getState();
    return (
      <div className="main">
        <h1>Static list of todos</h1>
        {!todos.length && !isLoading && (
          <button
            type="button"
            onClick={this.getData}
            className="btn btn-outline-dark"
          >
            Load todos
          </button>
        )}
        { isLoading && (
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {isLoaded && (
          <TodoList />
        )}
      </div>
    );
  }
}

export default App;
