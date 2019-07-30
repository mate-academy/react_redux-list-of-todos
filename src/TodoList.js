import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ID, TITLE, USER } from './constants';
import TodoItem from './TodoItem';
import getData from './getData';
import { loadTodos, sortBy } from './actionCreator';

function TodoList(props) {
  const [isLoaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSorting, setCurrentSorting] = useState('ID');

  const getTodos = async() => {
    const { loadTodos } = props;
    setLoading(true);
    const todos = await getData('todos');
    const users = await getData('users');
    const allTogether = todos.map(todo => ({
      todo,
      user: users.find(user => user.id === todo.userId),
    }));
    loadTodos(allTogether);
    setLoading(false);
    setLoaded(true);
  };

  const makeSorted = (field) => {
    const { sortBy } = props;
    sortBy(field, currentSorting);
    setCurrentSorting(field);
  };

  const { tasks } = props;
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
              tasks.map(todo => (
                <TodoItem
                  key={todo.todo.title}
                  todo={todo}
                  className="row"
                />
              ))
            }
          </tbody>
        </table>
      )
        : (
          <button
            type="button"
            onClick={() => getTodos()}
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
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.func.isRequired,
  loadTodos: PropTypes.func.isRequired,
};

export default connect(state => ({
  tasks: state.tasks,
}), { loadTodos, sortBy })(TodoList);
