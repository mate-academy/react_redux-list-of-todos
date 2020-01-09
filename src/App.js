
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDataFromServer from './api/allData';
import {
  startLoading,
  handleSuccess,
  handleError,

  getTodos,
  getLoading,
  getError,
} from './store';
import TodoList from './components/TodoList';

const App = (
  {
    todos, isLoading, hasError,
    start, success, error,
  }
) => {
  const loadData = async() => {
    start();

    try {
      const preparedData = await getDataFromServer();

      success(preparedData);
    } catch (e) {
      error();
    }
  };

  if (hasError) {
    return (
      <p>
        you have some problems with your network,
        <br />
        please refresh the page
      </p>
    );
  }

  if (!todos.length) {
    return (
      <button
        type="button"
        onClick={
          () => loadData()
        }
      >
        {isLoading ? 'Loading...' : 'Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  isLoading: getLoading(state),
  hasError: getError(state),
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(startLoading()),
  success: todos => dispatch(handleSuccess(todos)),
  error: () => dispatch(handleError()),
});

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
