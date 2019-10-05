import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { loadTodosAndUsers } from './store';

const App = ({
  todos,
  users,
  isLoading,
  hasError,
  loadData,
}) => {
  const buttonText = (hasError ? 'Try again' : 'Load todos');

  return (
    <div className="app">
      <h1>Static list of todos</h1>
      {todos.length === 0
        ? (
          <>
            <p>
              <strong>No yet todos</strong>
            </p>

            {hasError
              ? (
                <p>
                  <span className="badge badge-warning">Error occurred!</span>
                </p>
              )
              : null
            }

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => loadData()}
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : buttonText
              }
            </button>
          </>
        )
        : null}

      {isLoading
        ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
        : null}

      <p>
        <span>Todos: </span>
        {todos.length}
      </p>
      <TodoList />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
};

const getData = state => ({
  todos: state.todos,
  users: state.users,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const getMethod = dispatch => ({
  loadData: () => dispatch(loadTodosAndUsers()),
});

const userShape = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
};

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape(userShape),
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default connect(
  getData,
  getMethod
)(App);
