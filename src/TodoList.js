import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodosAndUsers } from './apiFetch';
import TodoItem from './TodoItem';
import { setTodosFromStore,
  setErrorFromStore,
  setLoadedFromStore,
  setLoadingFromStore,
  setSortedColumnFromStore }
  from './store';

const todoWithUsers = async() => {
  const [users, todos] = await fetchTodosAndUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

const TodoList = ({ todos, setTodos, isLoading, setLoading, loaded,
  setLoaded, sortedColumn, setSortedColumn, error, setError }) => {
  const loadTodos = async() => {
    try {
      setLoading(true);

      const gotTodos = await todoWithUsers();

      setTodos(gotTodos);
      setLoading(false);
      setLoaded(true);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const sortBy = (field) => {
    const by = {
      id: (a, b) => a.id - b.id,
      title: (a, b) => a.title.localeCompare(b.title),
      user: (a, b) => a.user.name.localeCompare(b.user.name),
      status: (a, b) => b.completed - a.completed,
    };

    setSortedColumn(field);

    sortedColumn !== field
      ? setTodos([...todos].sort(by[field]))
      : setTodos([...todos].reverse());
  };

  const deleteTodo = (id) => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.length === 0 && !error && (
        <button className="button" type="button" onClick={loadTodos}>
            Load
        </button>
      )}
      {isLoading && !error && <p>Loading...</p>}
      {loaded && !isLoading && (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => sortBy('id')}>ID</th>
              <th onClick={() => sortBy('title')}>TITLE</th>
              <th onClick={() => sortBy('user')}>USER</th>
              <th onClick={() => sortBy('status')}>STATUS</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoItem todo={todo} deleteTodo={deleteTodo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
      {error && (
        <div>
            Error
          <button className="button" type="button" onClick={loadTodos}>
              Try again
          </button>
        </div>
      )}
    </div>
  );
};

const getExtraData = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  loaded: state.loaded,
  error: state.error,
  sortedColumn: state.sortedColumn,
});

const getExtraMethods = dispatch => ({
  setTodos: value => dispatch(setTodosFromStore(value)),
  setError: value => dispatch(setErrorFromStore(value)),
  setLoading: value => dispatch(setLoadingFromStore(value)),
  setLoaded: value => dispatch(setLoadedFromStore(value)),
  setSortedColumn: value => dispatch(setSortedColumnFromStore(value)),
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  sortedColumn: PropTypes.string.isRequired,
  setTodos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSortedColumn: PropTypes.func.isRequired,
};

export default connect(getExtraData, getExtraMethods)(TodoList);
