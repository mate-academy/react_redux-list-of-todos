import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import getDataFromServer from './getDataApi';
import { todosURL, usersURL, SET_SORTING_TITLE, SET_FULL_TODOS } from './store';

const getTodosWithUsers = (todos, users) => (
  todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }))
);

const App = ({ fullTodos, setFullTodos,
  currentSortingTitle, setSortingTitle }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const loadTodosFromServer = async() => {
    try {
      setError(false);
      setLoading(true);

      const [todos, users] = await Promise.all(
        [getDataFromServer(todosURL), getDataFromServer(usersURL)]
      );

      setFullTodos(getTodosWithUsers(todos, users));
    } catch {
      setError(true);
      setFullTodos([]);
    }

    setLoading(false);
  };

  const setSortBy = (title) => {
    if (currentSortingTitle === title) {
      setFullTodos([...fullTodos].reverse());
    } else if (title === 'user') {
      setFullTodos([...fullTodos]
        .sort((firstTodo, secondTodo) => (
          firstTodo.user.name.localeCompare(secondTodo.user.name)
        )));
    } else {
      setFullTodos([...fullTodos].sort((firstTodo, secondTodo) => {
        switch (typeof firstTodo[title]) {
          case 'string':
            return firstTodo[title].localeCompare(secondTodo[title]);
          case 'boolean':
            return Number(secondTodo[title]) - Number(firstTodo[title]);
          default:
            return firstTodo[title] - secondTodo[title];
        }
      }));
    }

    setSortingTitle(title);
  };

  const removeTodo = (id) => {
    setFullTodos(fullTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      {fullTodos.length === 0 && !isError && !isLoading && (
        <button
          type="button"
          className="todo-list__button"
          onClick={loadTodosFromServer}
        >
          Load Todos
        </button>
      )}

      {isLoading && (<p className="todo-list__loading-text">Loading...</p>)}

      {fullTodos.length === 0 && isError && !isLoading && (
        <button
          type="button"
          className="todo-list__button"
          onClick={loadTodosFromServer}
        >
          Try again
        </button>
      )}
      {fullTodos.length > 0
        && (
          <TodoList
            todos={fullTodos}
            sortingTitle={currentSortingTitle}
            setSortBy={setSortBy}
            removeTodo={removeTodo}
          />
        )}
    </div>
  );
};

const getExtraData = state => ({
  fullTodos: state.fullTodos,
  currentSortingTitle: state.currentSortingTitle,
});

const getExtraMethods = dispatch => ({
  setFullTodos: newFullTodos => dispatch({
    type: SET_FULL_TODOS,
    value: newFullTodos,
  }),
  setSortingTitle: newSortingTitle => dispatch({
    type: SET_SORTING_TITLE,
    value: newSortingTitle,
  }),
});

App.propTypes = {
  fullTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.boolean,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  setFullTodos: PropTypes.func.isRequired,
  currentSortingTitle: PropTypes.string.isRequired,
  setSortingTitle: PropTypes.func.isRequired,
};

export default connect(getExtraData, getExtraMethods)(App);
