import React from 'react';
import './App.css';
import './components/TodoItem/TodoItem';

import { getData } from './api/data';
import TodoList from './components/TodoList/TodoList';
import {
  store, loading, loaded, getPreparedData,
} from './store';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

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

    Promise.all([getData('todos'), getData('users')])
      .then(([todos, users]) => {
        store.dispatch(getPreparedData(getTodosWithUsers(todos, users)));
        store.dispatch(loaded());
      })
      .finally(() => {
        store.dispatch(loading());
      });
  };

  render() {
    const {
      todos, isLoading, isLoaded,
    } = store.getState();
    return (
      <div className="app">
        {isLoading && (
          <div className="ui segment">
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
            <p />
            <p />
            <p />
          </div>
        )}
        {!todos.length && !isLoading && (
          <button onClick={this.getData} className="positive ui button">
            Click
          </button>
        )}
        {isLoaded && (
          <>
            <h1>
              <span className="ui red header">Static</span>
              {' '}
              <span className="ui green header">list</span>
              {' '}
              <span className="ui yellow header">of</span>
              {' '}
              <span className="ui blue header">todos</span>
            </h1>
            <div className="ui statistics">
              <div className="teal statistic">
                <div className="value">{todos.length}</div>
                <div className="label">TODOs</div>
              </div>
            </div>
            <TodoList todos={todos} />
          </>
        )}
      </div>
    );
  }
}

export default App;
