import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import ToDoList from './ToDoList';
import { getIsLoading, getTodos, loadDataFromServer } from './store';

function App({ todosWithUsers, isLoading, loadData }) {
  const startLoadingData = async() => {
    await loadData();
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {isLoading ? <h2>Loading...</h2> : ''}
      {todosWithUsers.length
        ? (
          <ToDoList todos={todosWithUsers} />
        )
        : (
          <button type="button" onClick={startLoadingData}>Load data</button>
        )
      }
    </div>
  );
}

const getData = state => ({
  isLoading: getIsLoading(state),
  todosWithUsers: getTodos(state),
});

const getMethods = {
  loadData: loadDataFromServer,
};

App.propTypes = {
  todosWithUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
