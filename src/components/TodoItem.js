/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { getTodos, setTodos } from './store';

const TodoItem = ({
  id, title, completed, user, todos, setTodos,
}) => {
  const updateStatus = (todoId) => {
    const newTodos = [...todos];
    const todo = newTodos.find(item => item.id === todoId);
    todo.completed = !todo.completed;

    setTodos([...newTodos]);
  };

  const handleDestroy = (todoId) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos([...newTodos]);
  };

  return (
    <tr>
      <td>
        <input
          id={`todo${id}`}
          type="checkbox"
          checked={completed}
          onChange={() => updateStatus(id)}
        />
      </td>

      <td>
        <label htmlFor={`todo${id}`}>
          {title}
        </label>
      </td>

      <td>
        <User {...user} />
      </td>

      <td>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDestroy(id)}
        />
      </td>
    </tr>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
  user: null,
};

const getData = state => ({
  todos: getTodos(state),
});

export default connect(
  getData,
  { setTodos },
)(TodoItem);
