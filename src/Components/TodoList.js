import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionTypes } from '../store/store';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  const sortTodos = (by) => {
    switch (by) {
      case 'user':
        setTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;

      case 'title':
        setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
        break;

      default:
        setTodos([...todos].sort((a, b) => a[by] - b[by]));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {['id', 'title', 'user', 'completed'].map(column => (
            <th
              key={column}
              onClick={event => sortTodos(event.target.innerText)}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </table>
  );
};

const getData = state => ({
  todos: state.todos,
  sortedTodos: state.sortedTodos,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: actionTypes.SET_TODOS,
    todos: newTodos,
  }),
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(TodoList);
