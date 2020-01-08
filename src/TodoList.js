
import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { getUsers, getTodos } from './ArrsAPI';
import {
  createSet,
  changeLoading,
  changeLoaded,
  changeError,
  changeSortedColumn,
} from './store';

const getTodosArr = async() => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

const TodoList = ({
  todos,
  setTodos,
  setLoading,
  setLoaded,
  setError,
  error,
  isLoading,
  loaded,
  setSortedColumn,
  sortedColumn,
}) => {
  const loadTodos = async() => {
    try {
      setLoading(true);

      const readyTodos = await getTodosArr();

      setTodos(readyTodos);
      setLoading(false);
      setLoaded(true);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const sortById = (a, b) => a.id - b.id;
  const sortByTitle = (a, b) => a.title.localeCompare(b.title);
  const sortbyName = (a, b) => a.user.name.localeCompare(b.user.name);
  const sortByStatus = (a, b) => (a.completed > b.completed ? -1 : 1);

  const sortHeader = (title, func) => {
    const sortedTodos = [...todos].sort(func);

    sortedColumn === title
      ? setTodos([...todos].reverse())
      : setTodos(sortedTodos);
    setSortedColumn(title);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.length === 0 && !error
        && (
          <button
            type="button"
            onClick={loadTodos}
          >
            Load
          </button>
        )}
      {isLoading && !error && <p>Loading...</p>}
      {loaded && !isLoading && (
        <table className="table">
          <thead>
            <tr className="header">
              <th onClick={e => sortHeader(e.target.innerText, sortById)}>
                ID
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortByTitle)}>
                TITLE
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortbyName)}>
                USER
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortByStatus)}>
                STATUS
              </th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr className="row">
                <TodoItem todo={todo} />
                <td>
                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="delete"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      }
      {error && (
        <div>
          Error occurred
          <button
            type="button"
            onClick={loadTodos}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

const getExtraData = state => ({
  todos: state.todos,
  error: state.error,
  isLoading: state.isLoading,
  loaded: state.loaded,
  sortedColumn: state.sortedColumn,
});

const getExtraMethods = dispatch => ({
  setTodos: newTodos => dispatch(createSet(newTodos)),
  setLoading: value => dispatch(changeLoading(value)),
  setLoaded: value => dispatch(changeLoaded(value)),
  setError: value => dispatch(changeError(value)),
  setSortedColumn: value => dispatch(changeSortedColumn(value)),
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  setSortedColumn: PropTypes.func.isRequired,
  sortedColumn: PropTypes.string.isRequired,
};

export default connect(
  getExtraData,
  getExtraMethods
)(TodoList);
