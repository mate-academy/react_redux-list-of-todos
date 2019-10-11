import React from 'react';
import PropTypes from 'prop-types';
import EnhancedList from './components/todo-list/TodoListHandler';
import './App.css';

const App = ({
  isLoading,
  getTodosUsers,
  isLoadData,
  hasError,
  sortTodos,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return (
      <>
        <h1>Please, try again.</h1>
        <button
          type="button"
          onClick={getTodosUsers}
        >
          Load again
        </button>
      </>
    );
  }

  if (!isLoadData) {
    return (
      <>
        <h1>Do you want to upload a list of todos?</h1>
        <button
          type="button"
          onClick={getTodosUsers}
        >
          Load
        </button>
      </>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={sortTodos}
      >
        Sort
      </button>
      <EnhancedList />
    </div>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getTodosUsers: PropTypes.func.isRequired,
  isLoadData: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  sortTodos: PropTypes.func.isRequired,
};

export default App;
