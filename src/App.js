import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import TodoListHandler from './TodoListHandler';

const App = (props) => {
  const { loadTodos, isLoading, hasError, isLoaded } = props;

  const load = async() => {
    await loadTodos();
  };

  if (hasError) {
    return (
      <p className="error-message">Oops, something went wrong!</p>
    );
  }

  return (
    <div className="App">
      {!isLoaded ? (
        <>
          <button
            className="button button_load"
            type="button"
            onClick={load}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      ) : (
        <>
          <h1 className="table__heading">Dynamic list of todos</h1>
          <TodoListHandler />
        </>
      )
      }
    </div>
  );
};

App.propTypes = {
  loadTodos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default App;
