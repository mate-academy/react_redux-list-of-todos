import React, { useState } from 'react';
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
              <td onClick={() => makeSorted(ID)}>id</td>
              <td onClick={() => makeSorted(TITLE)}>title</td>
              <td onClick={() => makeSorted(USER)}>user</td>
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

export default connect(state => ({
  tasks: state.tasks,
}), { loadTodos, sortBy })(TodoList);
