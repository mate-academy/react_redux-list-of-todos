import React from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList';
import './App.css';

const App = (props) => {
  const {
    sortedTodosList,
    isLoaded,
    isLoading,
    buttonText,
    isError,
    sortTodos,
    loadDataFromServer,
  } = props;

  const loadData = () => {
    loadDataFromServer();
  };

  const sortPosts = (event) => {
    const { value } = event.target;
    sortTodos(value);
  };

  if (!isLoaded) {
    let errText = null;
    if (isError) {
      errText = <p>No Data :( Try again</p>;
    }
    return (
      <div>
        {errText}
        <button
          type="submit"
          disabled={isLoading}
          onClick={loadData}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        value="name"
        type="submit"
        onClick={sortPosts}
      >
        Sort by Name
      </button>
      <button
        value="title"
        type="submit"
        onClick={sortPosts}
      >
        Sort by Title
      </button>
      <button
        value="completed"
        type="submit"
        onClick={sortPosts}
      >
        Sort by Comleted
      </button>
      <button
        type="submit"
        onClick={sortPosts}
      >
        Reset
      </button>
      <TodoList todos={sortedTodosList} />
    </div>
  );
};

App.propTypes = {
  loadDataFromServer: PropTypes.func.isRequired,
  sortTodos: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  sortedTodosList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default App;
