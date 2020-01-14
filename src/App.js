import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadDataFromServer,
  getIsLoading,
  getIsError,
  getCombinedTodos,
} from './store';
import TodoList from './TodoList';
import './App.css';

const App = ({ combinedTodos, isLoading, isError, loadData }) => {
  const startDataLoading = async() => {
    await loadData();
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos with Redux</h1>

      {combinedTodos.length ? (
        <TodoList list={combinedTodos} />
      ) : (
        <>
          <h2>{isError ? 'Error occured!!!' : 'No TodoList yet!'}</h2>

          <button
            className="load-btn"
            type="button"
            onClick={startDataLoading}
          >
            {isLoading ? 'Loading...' : 'Load TodoList'}
          </button>
        </>
      )}
    </div>
  );
};

const getData = state => ({
  combinedTodos: getCombinedTodos(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
});

const getMethods = { loadData: loadDataFromServer };

App.propTypes = {
  combinedTodos: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
