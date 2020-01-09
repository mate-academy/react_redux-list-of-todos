import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setTodosAC, setLoadingAC, setLoadedAC, setSortFieldAC,
  getTodos, getSortField, getIsLoading, getIsLoaded,
} from './store';
import { getTodosFromServer } from './api/todosApi';
import { getUsersFromServer } from './api/usersApi';
import TodoList from './TodoList';

const App = ({
  todos, setTodos, sortField, setSortField,
  isLoading, setLoading, isLoaded, setLoaded,
}) => {
  const loadTodos = async() => {
    setLoading(true);

    const [todosFromServer, usersFromServer] = await Promise.all(
      [getTodosFromServer(), getUsersFromServer()]
    );

    const preparedTodos = todosFromServer.map((todo) => {
      const user = usersFromServer.find(item => item.id === todo.userId);

      return {
        ...todo, user,
      };
    });

    setTodos(preparedTodos);
    setLoaded(true);
    setLoading(false);
  };

  const sortTodos = (sortBy) => {
    if (sortBy === sortField) {
      setTodos([...todos].reverse());
    } else {
      switch (sortBy) {
        case 'title':
          setTodos([...todos]
            .sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case 'user':
          setTodos([...todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
          break;
        case 'status':
          setTodos([...todos]
            .sort((a, b) => b.completed.toString().localeCompare(
              a.completed.toString()
            )));
          break;
        default:
          setTodos([...todos]
            .sort((a, b) => a.id - b.id));
      }
      setSortField(sortBy);
    }
  };

  return (
    <div className="App">
      <h1>React-Redux list of todos</h1>
      {!isLoaded && !isLoading
        ? (
          <button
            type="button"
            onClick={loadTodos}
          >
            Load list of Todos
          </button>
        )
        : ''
      }
      {isLoading ? (<h3>Loading... Please wait...</h3>) : ''}
      {isLoaded ? <TodoList sortTodos={sortTodos} /> : ''}
    </div>
  );
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  isLoading: getIsLoading(state),
  isLoaded: getIsLoaded(state),
  sortField: getSortField(state),
});

const mapDispatchToProps = {
  setTodos: setTodosAC,
  setLoading: setLoadingAC,
  setLoaded: setLoadedAC,
  setSortField: setSortFieldAC,
};

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  setTodos: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
