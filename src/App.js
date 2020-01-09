import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import { getTodos, getUsers } from './api';
import { actionTypes } from './store/store';
import TodoList from './Components/TodoList';

const App = ({ isLoading, setLoading, todos, setTodos }) => {
  const loadTodosAndUsers = async() => {
    setLoading(true);

    try {
      const [
        todosFromServer,
        usersFromServer,
      ] = await Promise.all([getTodos(), getUsers()]);

      setTodos(todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (todos.length === 0 ? (
        <button
          type="button"
          onClick={loadTodosAndUsers}
        >
          Load
        </button>
      ) : (
        <TodoList />
      ))}
    </div>
  );
};

const getData = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: actionTypes.SET_TODOS,
    todos: newTodos,
  }),
  setLoading: value => dispatch({
    type: actionTypes.SET_LOADING,
    value,
  }),
});

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
