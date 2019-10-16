import React, { Component } from 'react';

import './App.css';
import TodoList from './components/TodoList/TodoList';
import Dropdown from './components/Dropdown/Dropdown';

import { store } from './store/reducers';
import { loadTodos, setErrorMessage } from './store/action';

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const DROPDOWN_LIST = [
  {
    option: 'Title',
    value: 'title',
  },
  {
    option: 'User',
    value: 'userName',
  },
  {
    option: 'Status',
    value: 'completed',
  },
];

export default class App extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    errorMessage: null,
  };

  componentDidMount() {
    store.subscribe(() => this.setState({
      errorMessage: store.getState().error,
    }));
  }

  onLoadClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(`${BASE_URL}/todos`),
        fetch(`${BASE_URL}/users`),
      ]);

      if (!todosResponse.ok) {
        throw new Error('ToDo list fetch is broken');
      }

      if (!usersResponse.ok) {
        throw new Error('User list fetch is broken');
      }

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      store.dispatch(loadTodos(todos
        .map((todo) => ({
          ...todo,
          user: users.find((item) => item.id === todo.userId),
        }))
        .map((todo) => ({
          ...todo,
          userName: todo.user.name,
        }))));
    } catch (error) {
      store.dispatch(setErrorMessage(error.message));
    }

    this.setState({
      isLoaded: true,
      isLoading: false,
    });
  };

  loaderButton = () => (this.state.isLoading
    ? (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    )
    : (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => this.onLoadClick()}
      >
        Load
      </button>
    )
  );

  render() {
    const { isLoaded, errorMessage } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <h2 className="error-message">{errorMessage}</h2>

        {isLoaded
          ? (
            <>
              <Dropdown
                title="Sort by"
                itemsList={DROPDOWN_LIST}
              />
              <TodoList />
            </>
          )
          : this.loaderButton()}
      </div>
    );
  }
}
