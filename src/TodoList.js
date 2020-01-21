import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ID, TITLE, USER } from './constants';
import TodoItem from './TodoItem';
import getData from './getData';
import { loadAction, sortAction } from './actionCreator';

function TodoList({ todos, loadTodos, sortTodos }) {
  const [isLoaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSorting, setCurrentSorting] = useState('ID');

  const getTodos = async() => {
    setLoading(true);
    const todosData = await getData('todos');
    const usersData = await getData('users');
    const allTogether = todosData.map(todo => ({
      todo,
      user: usersData.find(user => user.id === todo.userId),
    }));
    await loadTodos(allTogether);
    setLoading(false);
    setLoaded(true);
  };

  const makeSorted = (field) => {
    sortTodos(field, currentSorting);
    setCurrentSorting(field);
  };

  return (
    <div>
      {isLoaded ? (
        <table className="table">
          <thead className="table-head">
            <tr>
              <td>
                <button
                  type="button"
                  onClick={() => makeSorted(ID)}
                  className="table--head-button"
                >
                  id
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => makeSorted(TITLE)}
                  className="table--head-button"
                >
                  title
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => makeSorted(USER)}
                  className="table--head-button"
                >
                  user
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {
              todos
                ? todos.map(todo => (
                  <TodoItem
                    key={todo.todo.title}
                    todo={todo}
                    className="row"
                  />
                ))
                : null
            }
          </tbody>
        </table>
      )
        : (
          <button
            type="button"
            onClick={getTodos}
            disabled={loading}
          >
            {loading ? 'Loading' : 'Load'}
          </button>
        )
      }
    </div>
  );
}

TodoList.propTypes = {
  sortTodos: PropTypes.func.isRequired,
  loadTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  todos: [],
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  loadTodos: todos => dispatch(loadAction(todos)),
  sortTodos: (field, type) => dispatch(sortAction(field, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
