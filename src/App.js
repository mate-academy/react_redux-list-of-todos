import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import {
  getIsLoaded,
  getIsLoading,
  changeIsLoading,
  setTodos,
  // sortByName,
  // sortByTitle,
  // sortById,
} from './components/store';
import getTodosWithUsers from './api/getData';

import SortButtons from './components/SortButtons';
import TodoList from './components/TodoList';

const App = ({
  isLoaded,
  isLoading,
  setTodos,
  changeIsLoading,
  // sortByName,
  // sortByTitle,
  // sortById,
}) => {
  const handleClick = () => {
    changeIsLoading();

    getTodosWithUsers().then((data) => {
      setTodos(data);
    });
  }

  return (
    <div className="App">
      { isLoaded ? (
        <>
          <h1 className="main-title">Dynamic list of todos</h1>
          <SortButtons />
          {/* <div className="sort-buttons">
            <h2>
              Sort by:
            </h2>
            <button
              type="button"
              onClick={sortById}
              className="sort-buttons__btn"
            >
              ID
            </button>
            <button
              type="button"
              onClick={sortByTitle}
              className="sort-buttons__btn"
            >
              Task
            </button>
            <button
              type="button"
              onClick={sortByName}
              className="sort-buttons__btn"
            >
              User
            </button>
          </div> */}

          <TodoList />
        </>
      ) : (
        <button type="button" onClick={handleClick} className="load-btn">
          {isLoading ? 'Loading...' : 'Load' }
        </button>
      )}
    </div>
  );
};

const getData = state => ({
  isLoaded: getIsLoaded(state),
  isLoading: getIsLoading(state),
});

const getMethods = dispatch => ({
  changeIsLoading: () => dispatch(changeIsLoading()),
  setTodos: (value) => dispatch(setTodos(value)),
  // sortByName: () => dispatch(sortByName()),
  // sortByTitle: () => dispatch(sortByTitle()),
  // sortById: () => dispatch(sortById()),
});

export default connect(getData, getMethods)(App);
