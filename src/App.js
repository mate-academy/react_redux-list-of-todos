/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import TodoList from './components/TodoList';
import { getTodosWithUsers } from './components/loadingData';
import { getTodos, setTodos } from './components/store';

const App = ({ todos, setTodos }) => {
  const [isLoadButtonVisible, setButtonVisible] = useState(true);
  const [textOfLoadButton, setButtonText] = useState('Load');

  const handleClick = () => {
    setButtonText('Loading...');

    getTodosWithUsers().then((data) => {
      setTodos(data);
      setButtonVisible(false);
    });
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      {
        (isLoadButtonVisible)
          ? (
            <button
              type="button"
              className="load-button"
              disabled={textOfLoadButton === 'Loading...'}
              onClick={handleClick}
            >
              {textOfLoadButton}
            </button>
          )
          : (
            <TodoList
              todos={todos}
            />
          )
      }
    </div>
  );
};

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  setTodos: PropTypes.func.isRequired,
};

const getData = state => ({
  todos: getTodos(state),
});

const getMethods = dispatch => ({
  setTodos: value => dispatch(setTodos(value)),
});

export default connect(
  getData,
  getMethods,
)(App);
