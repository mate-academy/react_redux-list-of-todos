import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { SET_TODOS, TODOS_URL, USERS_URL, SET_SORT_FIELD } from './const';
import { getDataFromUrl } from './api';
import './App.css';

function App({ todos, currentSortField, setTodos, setSortField }) {
  const [isLoading, setIsLoading] = useState(false);

  const setPreparedTodosFromServer = async() => {
    setIsLoading(true);

    const [todosList, usersList] = await Promise.all(
      [getDataFromUrl(TODOS_URL), getDataFromUrl(USERS_URL)]
    );

    const todosWithUsers = todosList.map(
      todo => ({
        ...todo,
        user: usersList.find(user => user.id === todo.userId).name,
      })
    );

    setTodos(todosWithUsers);
    setIsLoading(false);
  };

  const sortByField = (field, type) => {
    const todosCopy = [...todos];

    if (currentSortField === field) {
      setTodos(todosCopy.reverse());

      return;
    }

    switch (type) {
      case 'string':
        todosCopy.sort(
          (a, b) => a[field].localeCompare(b[field])
        );
        break;

      case 'number':
        todosCopy.sort(
          (a, b) => a[field] - b[field]
        );
        break;

      case 'boolean':
        todosCopy.sort(
          (a, b) => a[field].toString().localeCompare(b[field].toString())
        );
        break;

      default:
        todosCopy.sort();
    }

    setTodos(todosCopy);
    setSortField(field);
  };

  return (
    <div className="App">
      <h1>Redux list of TODOS</h1>
      {todos.length > 0
        ? (
          <TodoList
            todos={todos}
            sortByField={sortByField}
          />
        )
        : (
          <button
            disabled={isLoading}
            type="button"
            onClick={setPreparedTodosFromServer}
          >
            {isLoading ? 'Loading...' : 'Load Todos'}
          </button>
        )}
    </div>
  );
}

const getData = state => ({
  todos: state.todos,
  currentSortField: state.currentSortField,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: SET_TODOS,
    value: newTodos,
  }),
  setSortField: newSortField => dispatch({
    type: SET_SORT_FIELD,
    value: newSortField,
  }),
});

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSortField: PropTypes.string.isRequired,
  setTodos: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
