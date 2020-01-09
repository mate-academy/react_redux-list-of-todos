import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionTypes } from '../store/store';
import User from './User';

const TodoItem = ({ todo, deleteTodo }) => (
  <tbody>
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <User userData={todo.user} />
      <td
        className={todo.completed ? 'completed' : 'not-completed'}
      >
        {todo.completed ? 'yes' : 'no'}
      </td>
      <td>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          x
        </button>
      </td>
    </tr>
  </tbody>
);

const getMethods = dispatch => ({
  deleteTodo: todoId => dispatch({
    type: actionTypes.DELETE_TODO,
    todoId,
  }),
});

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default connect(() => ({}), getMethods)(TodoItem);
