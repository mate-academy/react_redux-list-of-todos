import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadDataFromServer,
  getIsLoading,
  getIsError,
  getCombinedTodos,
} from './Components/List';
import TodoList from './Components/TodoList';

const App = ({ combinedTodos, isLoading, isError, loadData }) => {
  const startDataLoading = async() => {
    await loadData();
  };

  return (
    <div>
      <h1>Redux list of todos</h1>
      {combinedTodos.length ? (
        <TodoList list={combinedTodos} />
      ) : (
        <>
          <h2>{isError ? 'Error' : ''}</h2>
          <button type="button" onClick={startDataLoading}>
            {isLoading ? 'Loading...' : 'Load'}
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

const getMethods = {
  loadData: loadDataFromServer,
};

App.propTypes = {
  combinedTodos: PropTypes.arrayOf(
    PropTypes.object
  ),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  loadData: PropTypes.func,
}.isRequired;

export default connect(getData, getMethods)(App);
