import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { getTodosFromServer, getUsersFromServer } from './api';

function App({
  setTodos, isLoading, setIsLoading, buttonStatus, setButtonStatus,
}) {
  const handleLoading = async() => {
    setIsLoading(true);

    const [todos, users] = await Promise.all(
      [getTodosFromServer(), getUsersFromServer()]
    );

    setIsLoading(false);
    setButtonStatus(false);

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    setTodos(preparedTodos);

    return preparedTodos;
  };

  if (isLoading) {
    return (
      <div className="App">
        <h1>List of Todos</h1>
        <h2 className="start-page">Loading...</h2>
      </div>
    );
  }

  return buttonStatus
    ? (
      <div className="App">
        <h1>List of Todos</h1>
        <button
          className="button"
          type="button"
          onClick={handleLoading}
        >
          Load
        </button>
      </div>
    ) : (
      <div className="App">
        <h1>List of Todos</h1>
        <TodoList />
      </div>
    );
}

const getData = state => ({
  isLoading: state.isLoading,
  buttonStatus: state.buttonStatus,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: 'SET_TODOS',
    todos: newTodos,
  }),
  setIsLoading: status => dispatch({
    type: 'SET_LOADING',
    isLoading: status,
  }),
  setButtonStatus: status => dispatch({
    type: 'SET_BUTTON',
    buttonStatus: status,
  }),
});

App.propTypes = {
  setTodos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  buttonStatus: PropTypes.bool.isRequired,
  setButtonStatus: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
